import { Request, Response, NextFunction} from "express";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import {MISSING_REQUIRED_FIELD, COMPANY_ID_LENGTH, INVALID_FILED} from '../types/constants.js';
import {IBusiness } from "../types/types.d.js";
import { validIndividualId } from "../utils/validationFunc.js";

export async function validateBusinessModel(req:Request,res:Response,next:NextFunction):void {
    console.log("from validate");
    throw new Error("Account ballance too low - blabla");
    const {company_id,company_name,context,currency,account_id,address,balance=0} = req.body;

    validateAccountMandatoryFields(currency as string,balance as number);

    if(!(company_id && company_name)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    if (account_id !== undefined) {
        throw new Error(INVALID_FILED);
    }  
    validIndividualId(COMPANY_ID_LENGTH,company_id as number);
    
    const account:Partial <IBusiness> = {company_id,company_name,currency,context,address,balance,status:true};
    req.accounts=[account];
    console.log("valid",account)
    next()
}