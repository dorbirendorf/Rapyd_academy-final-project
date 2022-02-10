// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { createMultipleRows, createRow, selectRowByIdWithJoin, sqlRes } from "../db.utils.js";
import { RowDataPacket} from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IAccount, IFamily, IIndividual ,IIndividualFromDB} from "../types/types.js";
import {extractIndividualFromObj} from "../individual/individual.db.js"
import { createAccount } from "../account/account.db.js";
export async function createFamilyAccount(family: Partial<IFamily>): Promise<number> {
    const account_id = await createAccount(family as IAccount,"family")
    await createRow("business", { account_id, context: family.context})
    return account_id;
}


export async function getFamilyAccountByIdShort(accountId: number): Promise<IFamily> {
    const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: accountId }, "primary_id", "account_id");
    if(!((accountRes as RowDataPacket[])[0])){
        throw new Error("Data not found")
     }
    const familyAccount = addOwners_idToFamily(extractFamilyFromObj((accountRes as RowDataPacket[])[0] as IFamily))
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

    const familyAccount = addOwnersToFamily(extractFamilyFromObj((accountRes as RowDataPacket[])[0] as IFamily))
    return familyAccount;
}

async function addOwnersToFamily(account: IFamily): Promise<IFamily> {
    account.owners = await getAllFamilyMembers(account.account_id);
    return account
}

export async function getAllFamilyMembers(familyId: number): Promise<IIndividual[]> {
    const [rows] = await db.query(`SELECT * FROM account JOIN individual on account.primary_id =  individual.account_id
    JOIN address on address.address_id = individual.address_id
    JOIN family_individuals on family_individuals.individual_id = individual.account_id
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

export function extractFamilyFromObj(obj: IFamily): IFamily {
    const { account_id, currency, balance, status,agent_id, type, context,  } = obj
    const family: IFamily = { account_id, currency, balance,agent_id, status, type,context};
    return family
 }