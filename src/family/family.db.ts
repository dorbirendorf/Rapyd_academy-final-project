// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import DbHandler from "../db.utils.js";
import {sqlRes} from "../db.utils.js";

import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IAccount, IFamily, IIndividual, IIndividualFromDB } from "../types/types.js";
import { createAccount } from "../account/account.db.js";
import logger from "../utils/logger.js";
import parser from "../parser.js";
export async function createFamilyAccount(family: Partial<IFamily>): Promise<number> {
    try {
        logger.params("createFamilyAccount", { family });

        const account_id = await createAccount(family as IAccount, "family")
        await DbHandler.createMultipleRows("family", [{ account_id, context: family.context }])
        logger.funcRet("createFamilyAccount", account_id);

        return account_id;
    } catch (error) {
        logger.error("createFamilyAccount", error as Error);
        throw error;
    }
}


export async function getFamilyAccountByIdShort(accountId: number): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdShort", { accountId });
        const accountRes = await DbHandler.selectRowByIdWithJoin("account", "family", { primary_id: accountId }, "primary_id", "account_id");
        if (!(accountRes[0])) {
            throw new Error("Data not found")
        }
        const familyAccount = addOwners_idToFamily(parser.parseFamilyFromObj(accountRes[0] as IFamily))
        logger.funcRet("getFamilyAccountByIdShort", familyAccount);
        return familyAccount;
    } catch (error) {
        logger.error("getFamilyAccountByIdShort", error as Error);
        throw error;
    }
}

async function addOwners_idToFamily(account: IFamily): Promise<IFamily> {
    try {
        logger.params("addOwners_idToFamily", { account });

        account.owners_id = await getAllFamilyMembersId(account.account_id);
        logger.funcRet("addOwners_idToFamily", account);

        return account
    } catch (error) {
        logger.error("addOwners_idToFamily", error as Error);
        throw error;
    }
}

export async function getAllFamilyMembersId(familyId: number): Promise<{ account_id: number }[]> {
    try {
        logger.params("getAllFamilyMembersId", { familyId });
        const rows = await DbHandler.selectRowById("family_individuals",{family_id:familyId},["individual_id"]) 
        const accounts_id = rows.map(obj => { return { account_id: obj.individual_id } })
        logger.funcRet("getAllFamilyMembersId", accounts_id);

        return accounts_id;
    } catch (error) {
        logger.error("getAllFamilyMembersId", error as Error);
        throw error;
    }
}

export async function getFamilyAccountByIdFull(familyId: number): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdFull", { familyId });
        const accountRes = await DbHandler.selectRowByIdWithJoin("account", "family", { primary_id: familyId }, "primary_id", "account_id");
        if (!(accountRes[0])) {
            throw new Error("Data not found")
        }

        const familyAccount = addOwnersToFamily(parser.parseFamilyFromObj((accountRes)[0] as IFamily))
        logger.funcRet("getFamilyAccountByIdFull", familyAccount);
        return familyAccount;
    } catch (error) {
        logger.error("getFamilyAccountByIdFull", error as Error);
        throw error;
    }
}

async function addOwnersToFamily(account: IFamily): Promise<IFamily> {
    try {
        logger.params("addOwnersToFamily", { account });

        account.owners = await getAllFamilyMembers(account.account_id);
        logger.funcRet("addOwnersToFamily", account);

        return account
    } catch (error) {
        logger.error("addOwnersToFamily", error as Error);
        throw error;
    }
}

export async function getAllFamilyMembers(familyId: number): Promise<IIndividual[]> {
    try {
        logger.params("getAllFamilyMembers", { familyId });

        const [rows] = await db.query(`SELECT * FROM account JOIN individual on account.primary_id =  individual.account_id
    JOIN family_individuals on family_individuals.individual_id = individual.account_id
    LEFT JOIN address on address.address_id = individual.address_id
    where family_individuals.family_id = ?`, [familyId]) as RowDataPacket[][]
        if (!(rows[0])) {
            logger.funcRet("getAllFamilyMembers", []);

            return []
        } else {
            const individuals = (rows as IIndividualFromDB[]).map((account) => parser.parseIndividualFromObj(account))
            logger.funcRet("getAllFamilyMembers", individuals);

            return individuals;
        }
    } catch (error) {
        logger.error("getAllFamilyMembers", error as Error);
        throw error;
    }
}


export async function addIndividualsToFamilyAccount(family_id: number, payload: number[]): Promise<sqlRes> {
    try {
        logger.params("addIndividualsToFamilyAccount", { family_id, payload });

        const res = await DbHandler.createMultipleRows("family_individuals", (payload.map(individual_id => { return { family_id, individual_id } })))
        logger.funcRet("addIndividualsToFamilyAccount", res);
        console.log(res);
        return res;

    } catch (error) {
        logger.error("addIndividualsToFamilyAccount", error as Error);
        throw error;
    }
}

export async function removeIndividualsFromFamilyAccount(familyId: number, payload: [number, number][]): Promise<sqlRes> {
    try {
        logger.params("removeIndividualsFromFamilyAccount", { familyId, payload });
        const orString = payload.map(pair => "individual_id = " + String(pair[0])).join(" OR ")
        const [res] = await db.query(`DELETE FROM family_individuals WHERE family_id = ${familyId} AND (${orString})`)
        logger.funcRet("removeIndividualsFromFamilyAccount", res);
        return res;
    } catch (error) {
        logger.error("removeIndividualsFromFamilyAccount", error as Error);
        throw error;
    }
}

