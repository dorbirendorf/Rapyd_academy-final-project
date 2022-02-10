import { Request, Response, NextFunction } from "express";
import { IFamily, IIndividual } from "../types/types.js";
export declare function validateFamilyModel(req: Request, res: Response, next: NextFunction): void;
export declare function validateAddToFamily(accounts: IIndividual[], owners: [number, number][], currency: string): void;
export declare function validateRemoveFromFamily(accounts: IIndividual[], owners: [number, number][], family: IFamily): void;
export declare function validateUpdateAccounts(req: Request, res: Response, next: NextFunction): void;
