import { sqlRes } from "../db.utils.js";
import { IFamily, IIndividual } from "../types/types.js";
export declare function createFamilyAccount(family: Partial<IFamily>): Promise<number>;
export declare function getFamilyAccountByIdShort(accountId: number): Promise<IFamily>;
export declare function getAllFamilyMembersId(familyId: number): Promise<{
    account_id: number;
}[]>;
export declare function getFamilyAccountByIdFull(familyId: number): Promise<IFamily>;
export declare function getAllFamilyMembers(familyId: number): Promise<IIndividual[]>;
export declare function addIndividualsToFamilyAccount(family_id: string, payload: number[]): Promise<sqlRes>;
export declare function removeIndividualsFromFamilyAccount(familyId: string, payload: [number, number][]): Promise<void>;
