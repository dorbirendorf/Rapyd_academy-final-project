/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OkPacket, RowDataPacket } from "mysql2";
import { createRow } from "../db.utils.js";
import { IBusiness, IBusinessFromDb } from "../types/types.js";
import { db } from "../db/sql/sql.connection.js"

export async function createBusinessAccount(business: IBusiness): Promise<number> {
    const accountRes = await createRow("account", { currency: business.currency, balance: business.balance, status: true, type: "business" })
    await createRow("business", { account_id: (accountRes as OkPacket).insertId, company_id: business.company_id, company_name: business.company_name, context: business.context, address_id: business.address_id })
    return (accountRes as OkPacket).insertId;
}

export async function getBusinessAccountById(accountId: number): Promise<IBusiness> {
    const [rows] = await db.query(`SELECT * FROM business JOIN account on business.account_id = account.primary_id
    JOIN address on address.address_id = business.address_id WHERE business.account_id = ?`, [accountId])
    const business = extractBusinessFromObj((rows as RowDataPacket[])[0] as IBusinessFromDb);
    return business
}
function extractBusinessFromObj(obj: IBusinessFromDb): IBusiness {
    const { account_id, currency, balance, amount, status, type, company_id, company_name,
        context, address_id, country_name, country_code, postal_code, city, region, street_name, street_number } = obj
    const business: IBusiness = { account_id, currency, balance, amount, status, type, company_id, company_name, context };
    business.address = { address_id, country_name, country_code, postal_code, city, region, street_name, street_number }
    return business
}

