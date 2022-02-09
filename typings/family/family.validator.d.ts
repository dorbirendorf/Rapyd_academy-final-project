import { Request, Response, NextFunction } from "express";
import { IAccount } from "../types/types.js";
export declare function validateFamilyModel(req: Request, res: Response, next: NextFunction): void;
export declare function validateFamilyAccounts(accounts: IAccount[], owners: [number, number][], currency: string): void;
