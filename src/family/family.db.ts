// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import { createMultipleRows, createRow, selectRowByIdWithJoin, sqlRes } from "../db.utils.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IAccount, IFamily, IIndividual, IIndividualFromDB } from "../types/types.js";
import { extractIndividualFromObj } from "../individual/individual.db.js"
import { createAccount } from "../account/account.db.js";
import logger from "../utils/logger.js";

export async function createFamilyAccount(family: Partial<IFamily>): Promise<number> {
    try {
        await logger.params("createFamilyAccount", { family });

        const account_id = await createAccount(family as IAccount, "family")
        await createRow("business", { account_id, context: family.context })
        await logger.funcRet("createFamilyAccount", account_id);

        return account_id;
    } catch (error) {
        await logger.error("createFamilyAccount", error as Error);
        throw error;
    }
}


export async function getFamilyAccountByIdShort(accountId: number): Promise<IFamily> {
    try {
        await logger.params("getFamilyAccountByIdShort", { accountId });
        const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: accountId }, "primary_id", "account_id");
        if (!(accountRes[0])) {
            throw new Error("Data not found")
        }
        const familyAccount = addOwners_idToFamily(extractFamilyFromObj(accountRes[0] as IFamily))
        await logger.funcRet("getFamilyAccountByIdShort", familyAccount);
        return familyAccount;
    } catch (error) {
        await logger.error("getFamilyAccountByIdShort", error as Error);
        throw error;
    }
}

async function addOwners_idToFamily(account: IFamily): Promise<IFamily> {
    try {
        await logger.params("addOwners_idToFamily", { account });

        account.owners_id = await getAllFamilyMembersId(account.account_id);
        await logger.funcRet("addOwners_idToFamily", account);

        return account
    } catch (error) {
        await logger.error("addOwners_idToFamily", error as Error);
        throw error;
    }
}

export async function getAllFamilyMembersId(familyId: number): Promise<{ account_id: number }[]> {
    try {
        await logger.params("getAllFamilyMembersId", { familyId });

        const [rows] = await db.query("SELECT account_id FROM family_individuals Where family_id = ?", [familyId])
        const accounts_id = rows as { account_id: number }[]
        await logger.funcRet("getAllFamilyMembersId", accounts_id);

        return accounts_id;
    } catch (error) {
        await logger.error("getAllFamilyMembersId", error as Error);
        throw error;
    }
}

export async function getFamilyAccountByIdFull(familyId: number): Promise<IFamily> {
    try {
        await logger.params("getFamilyAccountByIdFull", { familyId });
        const accountRes = await selectRowByIdWithJoin("account", "family", { primary_id: familyId }, "primary_id", "account_id");
        if (!(accountRes[0])) {
            throw new Error("Data not found")
        }

        const familyAccount = addOwnersToFamily(extractFamilyFromObj((accountRes)[0] as IFamily))
        await logger.funcRet("getFamilyAccountByIdFull", familyAccount);
        return familyAccount;
    } catch (error) {
        await logger.error("getFamilyAccountByIdFull", error as Error);
        throw error;
    }
}

async function addOwnersToFamily(account: IFamily): Promise<IFamily> {
    try {
        await logger.params("addOwnersToFamily", { account });

        account.owners = await getAllFamilyMembers(account.account_id);
        await logger.funcRet("addOwnersToFamily", account);

        return account
    } catch (error) {
        await logger.error("addOwnersToFamily", error as Error);
        throw error;
    }
}

export async function getAllFamilyMembers(familyId: number): Promise<IIndividual[]> {
    try {
        await logger.params("getAllFamilyMembers", { familyId });

        const [rows] = await db.query(`SELECT * FROM account JOIN individual on account.primary_id =  individual.account_id
    JOIN family_individuals on family_individuals.individual_id = individual.account_id
    LEFT JOIN address on address.address_id = individual.address_id
    where family_individuals.family_id = ?`, [familyId]) as RowDataPacket[][]
        if (!(rows[0])) {
            await logger.funcRet("getAllFamilyMembers", []);

            return []
        } else {
            const individuals = (rows as IIndividualFromDB[]).map(extractIndividualFromObj)
            await logger.funcRet("getAllFamilyMembers", individuals);

            return individuals;
        }
    } catch (error) {
        await logger.error("getAllFamilyMembers", error as Error);
        throw error;
    }
}


export async function addIndividualsToFamilyAccount(family_id: number, payload: number[]): Promise<sqlRes> {
    try {
        await logger.params("addIndividualsToFamilyAccount", { family_id, payload });

        const res = await createMultipleRows("family_individuals", (payload.map(individual_id => { return { family_id, individual_id } })))
        await logger.funcRet("addIndividualsToFamilyAccount", res);

        return res;

    } catch (error) {
        await logger.error("addIndividualsToFamilyAccount", error as Error);
        throw error;
    }
}

export async function removeIndividualsFromFamilyAccount(familyId: number, payload: [number, number][]): Promise<sqlRes> {
    try {
        await logger.params("removeIndividualsFromFamilyAccount", { familyId, payload });
        const orString = payload.map(pair => "individual_id = " + String(pair[0])).join(" OR ")
        const [res] = await db.query(`DELETE FROM family_individuals WHERE family_id = ${familyId} AND (${orString})`)
        await logger.funcRet("removeIndividualsFromFamilyAccount", res);
        return res;
    } catch (error) {
        await logger.error("removeIndividualsFromFamilyAccount", error as Error);
        throw error;
    }
}

export function extractFamilyFromObj(obj: IFamily): IFamily {
    try {
        logger.params("extractFamilyFromObj", { obj });

        const { account_id, currency, balance, status, agent_id, type, context, } = obj
        const family: IFamily = { account_id, currency, balance, agent_id, status, type, context };
        logger.funcRet("extractFamilyFromObj", family);
        return family
    } catch (error) {
        logger.error("extractFamilyFromObj", error as Error);
        throw error;
    }
}