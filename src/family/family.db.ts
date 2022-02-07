// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { createRow, selectRowByIdWithJoin,sqlRes } from "../db.utils.js";
import { OkPacket } from "mysql2";
import { addAddressToAccount } from "../business/business.db.js"
import { db } from "../db/sql/sql.connection.js";
import { pFamily } from "./family.interface.js";
import { pIndividual } from "../individual/individual.interface.js";
import promise from "bluebird";
// export async function createFamilyAccount(family:family):Promise<void>{
//    //implementation
//    }

export async function getFamilyAccountByIdShort(familyId: string): Promise<pFamily> {
    const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: familyId }, "primary_id", "account_id");
    const familyAccount = addOwners_idToFamily(accountRes as pFamily)
    return familyAccount;
}

async function addOwners_idToFamily(account: pFamily): Promise<pFamily> {
    account.owners_id = await getAllFamilyMembersId(String(account.account_id));
    return account
}

export async function getAllFamilyMembersId(familyId: string): Promise<{ account_id: number }[]> {
    const [rows] = await db.query("SELECT account_id FROM family_individuals Where family_id = ?", [familyId])
    return rows as { account_id: number }[];
}

export async function getFamilyAccountByIdFull(familyId: string): Promise<pFamily> {
    const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: familyId }, "primary_id", "account_id");
    const familyAccount = addOwnersToFamily(accountRes as pFamily)
    return familyAccount;
}

async function addOwnersToFamily(account: pFamily): Promise<pFamily> {
    account.owners = await getAllFamilyMembers(String(account.account_id));
    return account
}

export async function getAllFamilyMembers(familyId: string): Promise<pIndividual[]> {
    const [rows] = await db.query(`SELECT accounts.primary_id, currency, balance,status, individual_id, first_name,last_name, email
    FROM accounts join individual on accounts.primary_id =  individual.accounts_id
    join family_individuals on family_individuals.individual_id = individual.accounts_id
    where family_individuals.family_id = ?`, [familyId])
    return rows as pIndividual[];
}


export async function addIndividualsToFamilyAccount(family_id: string, payload: number[]):Promise<void> {
    const pendingPromise = promise.map(payload,(async (individual_id) =>{
        return createRow("family_individuals",{family_id,individual_id})
    }))
    await promise.all(pendingPromise)
}

export async function removeIndividualsFromFamilyAccount(familyId: string, payload: number[]):Promise<void> {
    const orString = payload.map(id => "individual_id = "+ id).join(" OR ")
    await db.query(`DELETE FROM family_individuals WHERE family_id = ${familyId} AND (${orString})`)
}

export async function closeFamilyAccount(familyId: string) {
    //implementation
}
