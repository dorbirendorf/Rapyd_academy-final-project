/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { IAccount, IFamily, Statuses } from "../types/types.js";
import { INVALID_FILED, INVALID_FILED_VALUE, MIN_FAMILY_BALANCE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { accountsActive, accountsCurrency as compareAccountsCurrency, accountsExist, accountsType as compareAccountsType } from "../utils/validationService.js";


export function validateFamilyModel(req:Request,res:Response,next:NextFunction):void {
    const {owners,context,currency,} = req.body;

    if(!currency){
        throw new Error(MISSING_REQUIRED_FIELD);
    }
    if(!owners){
        throw new Error(MISSING_REQUIRED_FIELD);
    }
         
    const account:Partial <IFamily> = {currency,context,owners,status:Statuses.Active};
    req.accounts.push(account);
    next()
}

export function validateFamilyAccounts(accounts:IAccount[],owners:[number,number][],currency:string):void {
   accountsExist(accounts,owners);
   accountsActive(accounts);
   compareAccountsType(accounts,"Individual");
   compareAccountsCurrency(accounts,currency);
   allowTransferBalance(accounts,MIN_FAMILY_BALANCE);

}


