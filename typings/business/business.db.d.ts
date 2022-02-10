import { IBusiness } from "../types/types.js";
export declare function createBusinessAccount(business: Partial<IBusiness>): Promise<number>;
export declare function getBusinessAccountById(accountId: number): Promise<IBusiness>;
