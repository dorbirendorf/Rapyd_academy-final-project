import { INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { Request, Response, NextFunction } from "express";
import { amountPositive } from "../utils/validationFunc.js";
import { IAccount } from "../types/types.js";
import { accountsActive, accountsCurrency, accountsType, allowTransfers } from "../utils/validationService.js";


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
export function validateTransferAccountsB2B(source:IAccount,dest:IAccount,amount:number):void{
    accountsActive([source,dest]);
    accountsType([source,dest],"business");
    accountsCurrency([source],dest.currency);
    allowTransfers([source],amount,100);
}
// export function validateTransferAccountsB2I(source:IAccount,dest:IAccount,amount:number):Promise<void>{
   
// }
