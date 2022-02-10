import { sqlRes } from "../db.utils.js";
import { IAccount } from "../types/types.js";
export declare function updateAccountsStatus(primary_id: number[], status: boolean): Promise<void>;
export declare function updateAccountStatus(primary_ids: number[], status: boolean): Promise<sqlRes>;
export declare function updateAccountBalance(idsAndBalances: [number, number][]): Promise<sqlRes>;
export declare function getAccountsById(accounts_id: number[]): Promise<IAccount[]>;
