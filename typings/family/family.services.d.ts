import { IFamily } from "../types/types.js";
export declare function createFamilyAccount(family: Partial<IFamily>, owners: [number, number][], currency: string): Promise<any>;
export declare function getFamilyAccountByIdShort(familyId: string): Promise<IFamily>;
export declare function getFamilyAccountByIdFull(familyId: string): Promise<IFamily>;
export declare function closeFamilyAccount(familyId: string): Promise<any>;
export declare function addIndividualsToFamilyAccount(familyId: string, owners: [number, number][], format: string): Promise<any>;
export declare function removeIndividualsFromFamilyAccount(familyId: string, owners: [number, number][], format: string): Promise<any>;
