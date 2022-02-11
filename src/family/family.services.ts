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
// import { validateFamilyAccounts } from "./family.validator.js";

export async function createFamilyAccount(
    family: Partial<IFamily>,
    owners: [number, number][],
    currency: string
): Promise<any> {
    //const accounts:IIndividual[] = await DB_INDIVIDUAL.getAllIndividualsAccountsById(owners);
    let id1 = {
        account_id: 1,
        currency: "ILS",
        balance: 100000,
        status: true,
        type: "individual",
        individual_id: 6,
        first_name: "string",
        last_name: "string",
        agent_id:1

    };
    let id2 = {
        account_id: 4,
        currency: "ILS",
        balance: 100000,
        status: true,
        type: "individual",
        individual_id: 6,
        first_name: "string",
        last_name: "string",
        agent_id:1
    };
    let accounts = [id1, id2];
    validateAddToFamily(accounts, owners, currency);
    return "dggf";
    //return await DB_FAMILY.createFamilyAccount(family);
}

export async function getFamilyAccountByIdShort(
    familyId: string
): Promise<IFamily> {
    //meir :if not found - throw....
    return await DB_FAMILY.getFamilyAccountByIdShort(Number(familyId));
}

export async function getFamilyAccountByIdFull(
    familyId: string
): Promise<IFamily> {
    //meir :if not found - throw....
    return await DB_FAMILY.getFamilyAccountByIdFull(Number(familyId));
}

export async function closeFamilyAccount(familyId: string): Promise<any> {
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
    return await DB_ACCOUNT.updateAccountsStatus([Number(familyId)], false);
}
export async function addIndividualsToFamilyAccount(
    familyId: string,
    owners: [number, number][],
    format: string
): Promise<any> {
    const family = await getFamilyAccountByIdShort(familyId);
    const individualIds = owners.map((owner: [number, number]) => owner[0]);
    const accounts: IIndividual[] =
        await DB_INDIVIDUAL.getAllIndividualsAccountsById(individualIds);
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
    await DB_FAMILY.addIndividualsToFamilyAccount(
        family.account_id,
        individualIds
    );
    let ans =
        format === "full"
            ? await DB_FAMILY.getFamilyAccountByIdFull
            : await DB_FAMILY.getFamilyAccountByIdShort;
    return ans;
}

export async function removeIndividualsFromFamilyAccount(
    familyId: string,
    owners: [number, number][],
    format: string
): Promise<any> {
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
        const owner = owners.find((own) => own[0] === account.account_id) as [number,number];
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
    let ans =
        format === "full"
            ? await DB_FAMILY.getFamilyAccountByIdFull
            : await DB_FAMILY.getFamilyAccountByIdShort;
    return ans;
}

