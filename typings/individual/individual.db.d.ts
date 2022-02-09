import { IIndividual } from "../types/types.js";
export declare function createIndividualAccount(individual: Partial<IIndividual>): Promise<number>;
export declare function getIndividualAccountById(accountId: number): Promise<IIndividual>;
export declare function getAllIndividualsAccountsById(payload: [number, number][]): Promise<IIndividual[]>;
