/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Request, Response, NextFunction } from "express";
import { IFamily, IIndividual, } from "../types/types.js";
import { ACCOUNT_NOT_EXIST, INVALID_FILED_VALUE, MIN_FAMILY_BALANCE, MISSING_REQUIRED_FIELD} from "../types/constants.js";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import { checkValidateOwners, sumFamilyAmounts } from "../utils/validationFunc.js";
import { accountsActive, accountsBelongToFamily, accountsCurrency, accountsExist, allowTransfers } from "../utils/validationService.js";
import { convertTupelsToArray } from "../utils/utils.js";
import logger from "../utils/logger.js";


export function validateFamilyModel(req:Request,res:Response,next:NextFunction):void {
    let {owners ,currency,balance=0,context=null,agent_id} = req.body;
    if(!(owners && owners.length>0)){
        throw new Error(`${MISSING_REQUIRED_FIELD} - we must get list of owners`);
    }
    const tupelsValid : boolean = owners.every((owner: number[])=>(!(isNaN(Number(owner[0])))&&(isNaN(Number(owner[1])))&&(owner[1]>0)));
     if (!tupelsValid){
       throw new Error(`${INVALID_FILED_VALUE}- not all tupels list are valid`)
    }
    validateAccountMandatoryFields(currency as string,balance as number,agent_id as number);
    sumFamilyAmounts(owners,MIN_FAMILY_BALANCE);
    const account= {currency,balance,status:true,type:"family",context,owners_id:[],agent_id};
    req.accounts=[account];
    console.log(account);
    next()
}

export function validateAddToFamily(accounts:IIndividual[],owners:[number,number][],currency:string):void {
  try{
      logger.params("validateAddToFamily",{accounts,owners,currency});
    accountsExist(accounts,owners);
   accountsActive(accounts);
   accountsCurrency(accounts,currency);
   accounts.map((account)=>{
       const owner = owners.find(own => own[0] === account.account_id)
       if(!owner){
        throw new Error(`${ACCOUNT_NOT_EXIST}- not all account exsits in individual table`)
    }
    const amount = owner[1];
    allowTransfers([account],amount,1000);
    logger.funcRet("validateAddToFamily","void");
   })
  } catch (error) {
    logger.error("validateAddToFamily", error as Error);
   throw error;
}

}
export function validateRemoveFromFamily(accounts:IIndividual[],owners:[number,number][],family:IFamily):void {
    try{
        logger.params("validateRemoveFromFamily",{accounts,owners,family}); 
        accountsExist(accounts,owners);
        const individualIds = convertTupelsToArray(owners);
        accountsBelongToFamily(family.owners as IIndividual[],individualIds);
        logger.funcRet("validateRemoveFromFamily","void");
    }catch (error) {
    logger.error("validateRemoveFromFamily", error as Error);
   throw error;
}
}

export function validateUpdateAccounts(req:Request,res:Response,next:NextFunction):void {
    let {owners,account_id} = req.body;
    if((account_id === "undefined")||(isNaN(Number(account_id)))){
        throw new Error(`${INVALID_FILED_VALUE} - account id isnt accept`)
     }
     if(!(owners && owners.length>0)){
        throw new Error(`${MISSING_REQUIRED_FIELD} - we must get list of owners`);
    }
    const tupelsValid : boolean = owners.every((owner: number[])=>(!(isNaN(Number(owner[0])))&&(isNaN(Number(owner[1])))&&(owner[1]>0)));
     if (!tupelsValid){
       throw new Error(`${INVALID_FILED_VALUE}- not all tupels list are valid`)
    }    next()
}

