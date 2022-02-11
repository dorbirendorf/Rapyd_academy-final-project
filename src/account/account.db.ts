/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { sqlRes, updateMultipleRowsById, createRow, selectRowById } from "../db.utils.js";
import { IAccount, IAddress } from "../types/types.js";
import { RowDataPacket, OkPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";


export async function updateAccountsStatus(primary_ids: number[], status: boolean): Promise<sqlRes> {
    const idsArray = primary_ids.map(primary_id => { return { primary_id } })
    const statusArray = primary_ids.map(() => { return { status } })
    const res = await updateMultipleRowsById("account", statusArray, idsArray);
    console.log(res);
    return res
}

export async function updateAccountsBalance(idsAndBalances: [number, number][]): Promise<sqlRes> {
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

export async function createAccount(account: Partial<IAccount>, type: string): Promise<number> {
    const res = await createRow("account", { currency: account.currency,agent_id:account.agent_id, balance: account.balance, status: true, type })
    return (res as OkPacket).insertId
}

export async function createAddress(address?: IAddress): Promise<number|null> {
    if (address) {
        const res = await createRow("address", address)
        return (res as OkPacket).insertId
    } else {
        return null;
    }
}

export async function getAgentByAccessId(access_key: string): Promise<string> {
    const [rows] = await selectRowById("agent",{access_key});
    if (!((rows as RowDataPacket[])[0])) {
        throw new Error("Data not found")
    }
    return (rows as RowDataPacket[])[0].secretKey as string
}



