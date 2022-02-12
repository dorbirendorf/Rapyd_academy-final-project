/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowDataPacket } from "mysql2";
import { createRow } from "../db.utils.js";
import { IBusiness, IBusinessFromDb } from "../types/types.js";
import { db } from "../db/sql/sql.connection.js"
import { createAccount, createAddress } from "../account/account.db.js";
import logger from "../utils/logger.js";

export async function createBusinessAccount(business: Partial<IBusiness>): Promise<number> {
    try {
        logger.params("createBusinessAccount", { business });
        const account_id = await createAccount(business, "business");
        const address_id = await createAddress(business.address);
        await createRow("business", { account_id, company_id: business.company_id, company_name: business.company_name, context: business.context, address_id })
        logger.funcRet("createBusinessAccount", account_id);
        return account_id;
    } catch (error) {
        logger.error("createBusinessAccount", error as Error);
        throw error;
    }
}

export async function getAllBusinessAccountById(accounts_id: number[]): Promise<IBusiness[]> {
    try {
        logger.params("getAllBusinessAccountById", { accounts_id });
        const orString = accounts_id.map(id => "account_id = " + id.toString()).join(" OR ")
        const [rows] = (await db.query(`SELECT * FROM business JOIN account on business.account_id = account.primary_id
    LEFT JOIN address on address.address_id = business.address_id WHERE ${orString}`)) as RowDataPacket[][]
        if (!(rows[0]) || rows.length != accounts_id.length) {
            throw new Error("Data not found")
        }
        const business = (rows as IBusinessFromDb[]).map(extractBusinessFromObj);
        logger.funcRet("getAllBusinessAccountById", business);
        return business
    } catch (error) {
        logger.error("getAllBusinessAccountById", error as Error);
        throw error;
    }
}

function extractBusinessFromObj(obj: IBusinessFromDb): IBusiness {
    try {
        logger.params("extractBusinessFromObj", { obj });
        const { account_id, currency, balance, agent_id, status, type, company_id, company_name,
            context, address_id, country_name, country_code, postal_code, city, region, street_name, street_number } = obj
        const business: IBusiness = { account_id, currency, agent_id, balance, status, type, company_id, company_name, context };
        business.address = { address_id, country_name, country_code, postal_code, city, region, street_name, street_number }
        logger.funcRet("extractBusinessFromObj", business);

        return business
    } catch (error) {
        logger.error("extractBusinessFromObj", error as Error);
        throw error;
    }
}

