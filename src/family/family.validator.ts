/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Request, Response, NextFunction } from "express";
import { IFamily, IIndividual, } from "../types/types.js";
import { ACCOUNT_NOT_EXIST, INVALID_FILED_VALUE, MIN_FAMILY_BALANCE, MISSING_REQUIRED_FIELD } from "../types/constants.js";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import { sumFamilyAmounts } from "../utils/validationFunc.js";
import { accountsActive, accountsBelongToFamily, accountsCurrency, accountsExist, allowTransfers } from "../utils/validationService.js";
import { convertTupelsToArray } from "../utils/utils.js";


export function validateFamilyModel(req:Request,res:Response,next:NextFunction):void {
    let {owners ,currency,balance=0,context=null,agent_id} = req.body;
    validateAccountMandatoryFields(currency as string,balance as number,agent_id as number);
    if(!owners){
        throw new Error(`${MISSING_REQUIRED_FIELD}- some mandatory field dont accept`)
    }
    const individualIds = owners.map((owner:[number,number])=>({"account_id":owner[0] }));
    balance = sumFamilyAmounts(owners,MIN_FAMILY_BALANCE);
    const account= {currency,balance,status:true,type:"family",context,owners_id:individualIds,agent_id};
    req.accounts=[account];
    console.log(account);
    next()
}

export function validateAddToFamily(accounts:IIndividual[],owners:[number,number][],currency:string):void {
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
   })
}
export function validateRemoveFromFamily(accounts:IIndividual[],owners:[number,number][],family:IFamily):void {
    accountsExist(accounts,owners);
    const individualIds = convertTupelsToArray(owners);
    accountsBelongToFamily(family.owners as IIndividual[],individualIds);
}
export function validateUpdateAccounts(req:Request,res:Response,next:NextFunction):void {
    let {owners,account_id} = req.body;
    if(!(owners &&account_id  && owners.length>0)){
        throw new Error(`${MISSING_REQUIRED_FIELD} - msg...`);
    }
    if((account_id === "undefined")||(isNaN(Number(account_id)))){
        throw new Error(`${INVALID_FILED_VALUE} - account id isnt accept`)
     }
    const tupelsValid : boolean = owners.every((owner: number[])=>(!(isNaN(Number(owner[0])))&&(owner[1]>0)));
     if (!tupelsValid){
       throw new Error(`${INVALID_FILED_VALUE}- not all tupels list are valid`)
    } 
    next()
}



