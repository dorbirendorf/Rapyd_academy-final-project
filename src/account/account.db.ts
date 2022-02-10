/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { sqlRes, updaetRowById, updateMultipleRowsById } from "../db.utils.js";
import { IAccount } from "../types/types.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";

export async function updateAccountsStatus(primary_id:number[],status:boolean):Promise<void>{ 
    await updaetRowById("accounts",{status},{primary_id});
}

export async function updateAccountStatus(primary_ids: number[], status: boolean): Promise<sqlRes> {
    const idsArray = primary_ids.map(primary_id => { return { primary_id } })
    const statusArray = primary_ids.map(() => { return { status } })
    const res = await updateMultipleRowsById("account", statusArray, idsArray);
    console.log(res);
    return res
}

export async function updateAccountBalance(idsAndBalances: [number, number][]): Promise<sqlRes> {
    const idsArray = idsAndBalances.map(pair => { return { primary_id: pair[0] } })
    const balanceArray = idsAndBalances.map(pair => { return { balance: pair[1] } })
    const res = await updateMultipleRowsById("account", balanceArray, idsArray);
    console.log(res);
    return res
}

export async function getAccountsById(accounts_id: number[]): Promise<IAccount[]> {
    const orString = accounts_id.map(id => "primary_id = " + id.toString()).join(" OR ")
    const [rows] = await db.query(`SELECT primary_id, status, balance, type, currency
    FROM account WHERE ${orString}`)
    if (!((rows as RowDataPacket[])[0])) {
        throw new Error("Data not found")
    }
    return (rows as RowDataPacket[]) as IAccount[]
}

