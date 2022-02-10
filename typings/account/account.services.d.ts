import { ITransfer } from "../types/types.js";
export declare function transferB2B(payload: ITransfer): Promise<string>;
export declare function transferB2BFX(payload: ITransfer): Promise<string>;
export declare function transferB2I(payload: ITransfer): Promise<string>;
export declare function transferF2B(payload: ITransfer): Promise<string>;
export declare function exectueTransfer(srcId: number, srcBalance: number, destId: number, srcCurr: string, destCurr: string, destBalance: number, amount: number, FX?: number): Promise<string>;
export declare function updateAccountStatus(accountsId: number[], action: boolean): Promise<string>;
