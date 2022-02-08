import { Request, Response, NextFunction} from "express";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import {INVALID_FILED_VALUE,MISSING_REQUIRED_FIELD, COMPANY_ID_LENGTH, INVALID_FILED} from '../types/constants.js';
import {IBusiness,Statuses } from "../types/types.js";
import { checkDigit } from "../utils/validationFunc.js";

export function validateBusinessModel(req:Request,res:Response,next:NextFunction):void {
    const {company_id,company_name,context,currency,account_id,address,balance=0} = req.body;

    validateAccountMandatoryFields(currency as string,balance as number);

    if(!(company_id && company_name)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    if (account_id !== undefined) {
        throw new Error(INVALID_FILED);
    }  
    if (!checkDigit(COMPANY_ID_LENGTH,company_id as number)){
        throw new Error(`${INVALID_FILED_VALUE}`);
    }
    
    const account:Partial <IBusiness> = {company_id,company_name,currency,context,address,balance,status:Statuses.Active};
    req.accounts.push(account);
    next()
}