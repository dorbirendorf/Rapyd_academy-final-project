import { IAccount } from "../types/types.js";
export declare function accountsExist(accounts: IAccount[], tuples: [number, number][]): boolean;
export declare function accountsActive(accounts: IAccount[]): boolean;
export declare function accountsType(accounts: IAccount[], type: string): boolean;
export declare function accountsCurrency(accounts: IAccount[], currency: string): boolean;
export declare function checkAmountBalance(accounts: IAccount[], minBalance: number): boolean;
export declare function allowTransfers(accounts: IAccount[], amount: number, minBalance: number): boolean;
export declare function checkLimitTransfer(type: string, amount: number, sourceName?: string, destName?: string): boolean;
