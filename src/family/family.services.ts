/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IFamily, IIndividual } from "../types/types.js";
import * as DB_ACCOUNT from "../account/account.db.js";
import * as DB_FAMILY from "../family/family.db.js";
import * as DB_INDIVIDUAL from "../individual/individual.db.js";

import {
    validateAddToFamily,
    validateRemoveFromFamily,
} from "./family.validator.js";
import {
    INVALID_FILED_VALUE,
    MIN_FAMILY_BALANCE,
    SOMTHING_WENT_WRONG,
} from "../types/constants.js";
import { sumFamilyAmounts } from "../utils/validationFunc.js";
import { convertTupelsToArray } from "../utils/utils.js";
import logger from "../utils/logger.js";
// import { validateFamilyAccounts } from "./family.validator.js";

export async function createFamilyAccount(family: Partial<IFamily>, owners: [number, number][],
    currency: string): Promise<any> {
    try {
        logger.params("createFamilyAccount", { family, owners, currency });
        const familyId = await DB_FAMILY.createFamilyAccount(family); //return account id
        let ans = addIndividualsToFamilyAccount(familyId, owners, "full");
        logger.funcRet("createFamilyAccount", ans);
        return ans;
    } catch (error) {
        logger.error("createFamilyAccount", error as Error);
        throw error;
    }
}
export async function addIndividualsToFamilyAccount(
    familyId: number,
    owners: [number, number][],
    format: string
): Promise<any> {
    try {
        logger.params("addIndividualsToFamilyAccount", { familyId, owners, format })
        const family = await getFamilyAccountByIdShort(familyId);
        const individualIds = convertTupelsToArray(owners);
        const accounts: IIndividual[] = await DB_INDIVIDUAL.getAllIndividualsAccountsById(individualIds);
        validateAddToFamily(accounts, owners, family.currency);
        let IndividualSBalance: [number, number][] = accounts.map((account) => {
            const owner = owners.find((own) => own[0] === account.account_id) as [
                number,
                number
            ];
            return [owner[0], account.balance - owner[1]];
        });
        const familyBalance: [number, number] = [
            family.account_id,
            owners.reduce((prev, owner) => owner[1] + prev, family.balance),
        ];
        IndividualSBalance.push(familyBalance);
        await DB_ACCOUNT.updateAccountsBalance(IndividualSBalance);
        await DB_FAMILY.addIndividualsToFamilyAccount(family.account_id, individualIds);
        let ans = 
            format === "full"
                ? await DB_FAMILY.getFamilyAccountByIdFull(familyId)
                : await DB_FAMILY.getFamilyAccountByIdShort(familyId);
        logger.funcRet("addIndividualsToFamilyAccount", ans);
        return ans;
    } catch (error) {
        logger.error("addIndividualsToFamilyAccount", error as Error);
        throw error;
    }
}

export async function getFamilyAccountByIdShort(familyId: number): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdShort", { familyId });
        let ans = await DB_FAMILY.getFamilyAccountByIdShort(Number(familyId));
        logger.funcRet("getFamilyAccountByIdShort", ans);
        return ans;
    } catch (error) {
        logger.error("getFamilyAccountByIdShort", error as Error);
        throw error;
    }
}

export async function getFamilyAccountByIdFull(
    familyId: number
): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdFull", { familyId });
        let ans = await DB_FAMILY.getFamilyAccountByIdFull(Number(familyId));
        logger.funcRet("getFamilyAccountByIdFull", ans);
        return ans;
    } catch (error) {
        logger.error("getFamilyAccountByIdFull", error as Error);
        throw error;
    }
}

export async function closeFamilyAccount(familyId: number): Promise<any> {
    try {
        logger.params("closeFamilyAccount", { familyId });
        const family = await getFamilyAccountByIdFull(familyId);
        if (family.status === false) {
            throw new Error(
                `${INVALID_FILED_VALUE}- family ${family.account_id} accout is alreay close`
            );
        }
        if ((family.owners as IIndividual[]).length > 0) {
            throw new Error(
                `${SOMTHING_WENT_WRONG}- family ${family.account_id} still have owners`
            );
        }
        let ans = await DB_ACCOUNT.updateAccountsStatus([Number(familyId)], false);
        logger.funcRet("closeFamilyAccount", ans);
        return ans;
    } catch (error) {
        logger.error("closeFamilyAccount", error as Error);
        throw error;
    }
}


export async function removeIndividualsFromFamilyAccount(
    familyId: number,
    owners: [number, number][],
    format: string
): Promise<any> {
    try {
        logger.params("removeIndividualsFromFamilyAccount", { familyId, owners, format });
        const family = await getFamilyAccountByIdFull(familyId);
        const accounts: IIndividual[] = await DB_INDIVIDUAL.getAllIndividualsAccountsById(convertTupelsToArray(owners));
        validateRemoveFromFamily(accounts, owners, family);
        let removeBalance = 0;
        if ((family.owners as IIndividual[]).length === owners.length) {
            removeBalance = sumFamilyAmounts(owners, 0); //should be >=0
        }
        if ((family.owners as IIndividual[]).length > owners.length) {
            removeBalance = sumFamilyAmounts(owners, MIN_FAMILY_BALANCE); //should be >=5000
        }
        let IndividualSBalance: [number, number][] = accounts.map((account) => {
            const owner = owners.find((own) => own[0] === account.account_id) as [number, number];
            return [owner[0], account.balance + owner[1]];
        });
        const familyBalance: [number, number] = [
            family.account_id,
            family.balance - removeBalance,
        ];
        IndividualSBalance.push(familyBalance);
        await DB_ACCOUNT.updateAccountsBalance(IndividualSBalance);
        await DB_FAMILY.removeIndividualsFromFamilyAccount(
            family.account_id,
            owners
        );
        let ans = format === "full" ?
            await DB_FAMILY.getFamilyAccountByIdFull : await DB_FAMILY.getFamilyAccountByIdShort;
        logger.funcRet("removeIndividualsFromFamilyAccount", ans);
        return ans;
    }
    catch (error) {
        logger.error("removeIndividualsFromFamilyAccount", error as Error);
        throw error;
    }
}

