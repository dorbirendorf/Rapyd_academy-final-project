/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { Request, Response, NextFunction } from "express";
import { amountPositive } from "../utils/validationFunc.js";
import { IAccount, IBusiness, IFamily, IIndividual } from "../types/types.js";
import { accountsActive, accountsCurrency, accountsTypes, allowTransfers, checkLimitTransfer, checkProperState } from "../utils/validationService.js";
import logger from "../utils/logger.js";

export function validateAccountMandatoryFields(currency:string,balance:number):void {
   
    try{
        logger.params("validateAccountMandatoryFields", {currency,balance});
        if (currency === undefined) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
    }
    if (balance === undefined) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
    }
    if (balance < 0) {
        throw new Error(`${MISSING_REQUIRED_FIELD} - some mandatory field dont accept`)
    }
    logger.funcRet("validateAccountMandatoryFields", "void");}catch (error) {
        logger.error("validateAccountMandatoryFields", error as Error);
       throw error;
   }
 }
 
 export async function validateTransferModel(req:Request,res:Response,next:NextFunction):Promise<void> {
     let {source, destination, amount} = req.body;
     if(!(source && destination && amount)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    amountPositive(amount as number);
    next();
}

export function validateTransferAccountsB2I(source:IBusiness,dest:IIndividual,amount:number):void{
    try{        logger.params("validateTransferAccountsB2I",{source,dest,amount});

        validateTransferAccounts(source,dest,amount,10000);
    checkLimitTransfer("B2I",amount);
    logger.funcRet("validateTransferAccountsB2I", "void");
}catch (error) {
        logger.error("validateTransferAccountsB2I", error as Error);
       throw error;
   }
}

export function validateTransferAccountsF2B(source:IFamily,dest:IBusiness,amount:number):void{
    try{        logger.params("validateTransferAccountsF2B",{source,dest,amount});

        validateTransferAccounts(source,dest,amount,5000);
    checkLimitTransfer("F2B",amount);
    logger.funcRet("validateTransferAccountsF2B", "void");
} catch (error) {
        logger.error("validateTransferAccountsF2B", error as Error);
       throw error;
   }
}
export function validateTransferAccountsB2B(source:IBusiness,dest:IBusiness,amount:number,FX=false):void{
    try{        logger.params("validateTransferAccountsB2B",{source,dest,amount,FX});

        validateTransferAccounts(source,dest,amount,10000,FX);
    checkLimitTransfer("B2B",amount,source.company_name,dest.company_name);
       
    logger.funcRet("validateTransferAccountsB2B", "void");
}catch (error) {
        logger.error("validateTransferAccountsB2B", error as Error);
       throw error;
   }
}
export function validateTransferAccounts(source:IAccount,dest:IAccount,amount:number,limit:number,FX = false):void{
    try{        logger.params("validateTransferAccounts",{source,dest,amount,limit,FX});

        accountsActive([source,dest]);
    accountsCurrency([source],dest.currency,FX);
    allowTransfers([source],amount,limit);
    logger.funcRet("validateTransferAccounts", "void");
}catch (error) {
        logger.error("validateTransferAccounts", error as Error);
       throw error;
   }

}
export async function validateStatus(req:Request,res:Response,next:NextFunction):Promise<void> {
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
try{    logger.params("validateStatusAccounts", {accounts,accountsId,action});

    accountsTypes(accounts,["individual", "business"]);
checkProperState(accounts,!action);
logger.funcRet("validateStatusAccounts","void");
}catch (error) {
    logger.error("validateStatusAccounts", error as Error);
   throw error;
}
}

