import { INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { Request, Response, NextFunction } from "express";
import { amountPositive } from "../utils/validationFunc.js";
import { IAccount, IBusiness, IFamily, IIndividual } from "../types/types.js";
import { accountsActive, accountsCurrency, allowTransfers, checkLimitTransfer } from "../utils/validationService.js";


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
 
 export function validateTransferModel(req:Request,res:Response,next:NextFunction):void {
     let {source, destination, amount} = req.body;
     if(!(source && destination && amount)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    amountPositive(amount as number);
    next();
}
export function validateTransferAccountsB2B(source:IBusiness,dest:IBusiness,amount:number):void{
    validateTransferAccounts(source,dest,amount,10000);
    checkLimitTransfer("B2B",amount,source.company_name,dest.company_name);
}

export function validateTransferAccountsB2I(source:IBusiness,dest:IIndividual,amount:number):void{
    validateTransferAccounts(source,dest,amount,10000);
    checkLimitTransfer("B2I",amount);
}

export function validateTransferAccountsF2B(source:IFamily,dest:IBusiness,amount:number):void{
    validateTransferAccounts(source,dest,amount,5000);
    checkLimitTransfer("F2B",amount);
}

export function validateTransferAccounts(source:IAccount,dest:IAccount,amount:number,limit:number):void{
    accountsActive([source,dest]);
    accountsCurrency([source],dest.currency);
    allowTransfers([source],amount,limit);
}
