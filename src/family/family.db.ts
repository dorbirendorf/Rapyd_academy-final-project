// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { createMultipleRows, createRow, selectRowByIdWithJoin, sqlRes } from "../db.utils.js";
import { OkPacket , RowDataPacket} from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IFamily, IIndividual ,IIndividualFromDB} from "../types/types.js";
import {extractIndividualFromObj} from "../individual/individual.db.js"
export async function createFamilyAccount(family: Partial<IFamily>): Promise<number> {
    const accountRes = await createRow("account", { currency: family.currency, balance: family.balance, status: true, type: "family" })
    await createRow("business", { account_id: (accountRes as OkPacket).insertId, context: family.context})
    return (accountRes as OkPacket).insertId;
}


export async function getFamilyAccountByIdShort(accountId: number): Promise<IFamily> {
    const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: accountId }, "primary_id", "account_id");
    if(!((accountRes as RowDataPacket[])[0])){
        throw new Error("Data not found")
     }
    const familyAccount = addOwners_idToFamily((accountRes as RowDataPacket[])[0] as IFamily)
    return familyAccount;
}

async function addOwners_idToFamily(account: IFamily): Promise<IFamily> {
    account.owners_id = await getAllFamilyMembersId(account.account_id);
    return account
}

export async function getAllFamilyMembersId(familyId: number): Promise<{ account_id: number }[]> {
    const [rows] = await db.query("SELECT account_id FROM family_individuals Where family_id = ?", [familyId])
    return rows as { account_id: number }[];
}

export async function getFamilyAccountByIdFull(familyId: number): Promise<IFamily> {
    const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: familyId }, "primary_id", "account_id");
    if(!((accountRes as RowDataPacket[])[0])){
        throw new Error("Data not found")
     }
    const familyAccount = addOwnersToFamily((accountRes as RowDataPacket[])[0] as IFamily)
    return familyAccount;
}

async function addOwnersToFamily(account: IFamily): Promise<IFamily> {
    account.owners = await getAllFamilyMembers(account.account_id);
    return account
}

export async function getAllFamilyMembers(familyId: number): Promise<IIndividual[]> {
    const [rows] = await db.query(`SELECT * FROM accounts JOIN individual on accounts.primary_id =  individual.accounts_id
    JOIN address on address.address_id = individual.address_id
    JOIN family_individuals on family_individuals.individual_id = individual.accounts_id
    where family_individuals.family_id = ?`, [familyId])
    if(!((rows as RowDataPacket[])[0])){
        return []
     } else {
        const individuals = ((rows as RowDataPacket[]) as IIndividualFromDB[]).map(extractIndividualFromObj)
        return individuals;
    }
}


export async function addIndividualsToFamilyAccount(family_id: string, payload: number[]): Promise<sqlRes> {
    const res = await createMultipleRows("family_individuals",(payload.map(individual_id => {return {family_id,individual_id}})))
    return res;
}

export async function removeIndividualsFromFamilyAccount(familyId: string, payload: [number,number][]): Promise<void> {
    const orString = payload.map(pair => "individual_id = " + String(pair[0])).join(" OR ")
    await db.query(`DELETE FROM family_individuals WHERE family_id = ${familyId} AND (${orString})`)
}

