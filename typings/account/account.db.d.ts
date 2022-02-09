import { IAccount } from "../types/types.js";
export declare function updateAccountStatus(primary_id: number, status: boolean): Promise<void>;
export declare function updateAccountBalance(primary_id: number, balance: number): Promise<void>;
export declare function getAccountsById(account: number): Promise<IAccount>;
