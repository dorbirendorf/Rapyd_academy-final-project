import { Request, Response, NextFunction } from "express";
import { IAccount, IBusiness, IFamily, IIndividual } from "../types/types.js";
export declare function validateAccountMandatoryFields(currency: string, balance: number): void;
export declare function validateTransferModel(req: Request, res: Response, next: NextFunction): void;
export declare function validateTransferAccountsB2B(source: IBusiness, dest: IBusiness, amount: number): void;
export declare function validateTransferAccountsB2I(source: IBusiness, dest: IIndividual, amount: number): void;
export declare function validateTransferAccountsF2B(source: IFamily, dest: IBusiness, amount: number): void;
export declare function validateTransferAccounts(source: IAccount, dest: IAccount, amount: number, limit: number): void;