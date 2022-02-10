import { IIndividual } from "../types/types.js";
export declare function createIndividualAccount(individual: Partial<IIndividual>): Promise<any>;
export declare function getIndividualByAccountId(accountId: string): Promise<IIndividual>;
export declare function getIndividualByIndividualId(individualId: number): Promise<any>;
