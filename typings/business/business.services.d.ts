import { IBusiness } from "../types/types.js";
export declare function createBusinessAccount(business: Partial<IBusiness>): Promise<any>;
export declare function getBusinessAccountById(accountId: string): Promise<any>;
