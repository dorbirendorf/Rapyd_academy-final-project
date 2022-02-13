/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowDataPacket } from "mysql2";
import DbHandler from "../db.utils.js";
import { IBusiness, IBusinessFromDb } from "../types/types.js";
import { db } from "../db/sql/sql.connection.js"
import { createAccount, createAddress } from "../account/account.db.js";
import logger from "../utils/logger.js";
import parser from "../parser.js";

export async function createBusinessAccount(business: Partial<IBusiness>): Promise<number> {
    try {
        logger.params("createBusinessAccount", { business });
        const account_id = await createAccount(business, "business");
        const address_id = await createAddress(business.address);
        await DbHandler.createMultipleRows("business", [{ account_id, company_id: business.company_id, company_name: business.company_name, context: business.context, address_id }])
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
        const business = (rows as IBusinessFromDb[]).map((account) => parser.ParseBusinessFromObj(account));
        logger.funcRet("getAllBusinessAccountById", business);
        return business
    } catch (error) {
        logger.error("getAllBusinessAccountById", error as Error);
        throw error;
    }
}


