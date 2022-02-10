import { IIndividual, IIndividualFromDB } from "../types/types.js";
export declare function createIndividualAccount(individual: Partial<IIndividual>): Promise<number>;
export declare function getAllIndividualsAccountsById(payload: number[]): Promise<IIndividual[]>;
export declare function checkIfIndivdualExistByIndividualId(individual_id: number): Promise<boolean>;
export declare function extractIndividualFromObj(obj: IIndividualFromDB): IIndividual;
