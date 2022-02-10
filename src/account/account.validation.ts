/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ACCOUNT_NOT_EXIST, INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { Request, Response, NextFunction } from "express";
import { amountPositive } from "../utils/validationFunc.js";
import { IAccount, IBusiness, IFamily, IIndividual } from "../types/types.js";
import { accountsActive, accountsCurrency, accountsTypes, allowTransfers, checkLimitTransfer, checkProperState } from "../utils/validationService.js";


export function validateAccountMandatoryFields(currency:string,balance:number):void {
   
    if (currency === undefined) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
    }
    if (balance === undefined) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
    }
    if (balance < 0) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
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

export function validateTransferAccountsB2I(source:IBusiness,dest:IIndividual,amount:number):void{
    validateTransferAccounts(source,dest,amount,10000);
    checkLimitTransfer("B2I",amount);
}

export function validateTransferAccountsF2B(source:IFamily,dest:IBusiness,amount:number):void{
    validateTransferAccounts(source,dest,amount,5000);
    checkLimitTransfer("F2B",amount);
}
export function validateTransferAccountsB2B(source:IBusiness,dest:IBusiness,amount:number,FX=false):void{
    validateTransferAccounts(source,dest,amount,10000,FX);
    checkLimitTransfer("B2B",amount,source.company_name,dest.company_name);
}
export function validateTransferAccounts(source:IAccount,dest:IAccount,amount:number,limit:number,FX = false):void{
    accountsActive([source,dest]);
    accountsCurrency([source],dest.currency,FX);
    allowTransfers([source],amount,limit);

}
export function validateStatus(req:Request,res:Response,next:NextFunction):void {
    let {accounts,action} = req.body;
    if(!(accounts && action && accounts.length>0)){
       throw new Error(`${MISSING_REQUIRED_FIELD}`);
   }
    const allNumber:boolean = accounts.every((acc:any)=>(typeof acc ==="number"));
    if (!allNumber){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts are type number`)
   }
   next();
}
export function validateStatusAccounts(accounts:IAccount[],accountsId:number[], action:boolean):void {
accountsTypes(accounts,["individual", "business"]);
checkProperState(accounts,!action);
}

