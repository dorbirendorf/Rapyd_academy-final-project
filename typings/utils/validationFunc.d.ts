import { Request, Response, NextFunction } from "express";
export declare function validIndividualId(id_length: number, id: number): void;
export declare function checkBalance(minimalBalance: number, balance: number): void;
export declare function amountPositive(amount: number): void;
export declare function sumFamilyAmounts(tupels: [number, number][], minBalance: number): number;
export declare function initRequiredParams(): Map<string, string[]>;
export declare function validateAccountId(req: Request, res: Response, next: NextFunction): Promise<void>;
