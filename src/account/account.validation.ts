import { INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { Request, Response, NextFunction } from "express";
import { amountPositive } from "../utils/validationFunc.js";


export function validateAccountMandatoryFields(currency:string,balance:number):void {
   
    if (currency === undefined) {
        throw new Error(MISSING_REQUIRED_FIELD);
    }
    if (balance === undefined) {
        throw new Error(MISSING_REQUIRED_FIELD);
    }
    if (balance < 0) {
        throw new Error(INVALID_FILED_VALUE);
    }
 }
 export function validateTransfer(req:Request,res:Response,next:NextFunction):void {
     let {source, destination, amount} = req.body;
     if(!(source && destination && amount)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    amountPositive(amount as number);
    next();
}

