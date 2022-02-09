import { IBusiness, IIndividual } from "../types/types.js";
export declare function createBusinessAccount(business: IBusiness): Promise<number>;
export declare function getBusinessAccountById(accountId: number): Promise<IBusiness>;
export declare function addAddressToAccount(account: IBusiness | IIndividual): Promise<IBusiness | IIndividual>;
