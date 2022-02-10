import { IAccount, transferType } from "../types/types.js";
export declare function accountsExist(accounts: IAccount[], tuples: [number, number][]): boolean;
export declare function accountsActive(accounts: IAccount[]): boolean;
export declare function checkProperState(accounts: IAccount[], action: boolean): boolean;
export declare function accountsTypes(accounts: IAccount[], type: string[]): boolean;
export declare function accountsCurrency(accounts: IAccount[], currency: string, FX?: boolean): boolean;
export declare function accountsBelongToFamily(owners: {
    account_id: number;
}[], accounts: number[]): boolean;
export declare function allowTransfers(accounts: IAccount[], amount: number, minBalance: number): boolean;
export declare function checkLimitTransfer(type: transferType, amount: number, sourceName?: string, destName?: string): boolean;
