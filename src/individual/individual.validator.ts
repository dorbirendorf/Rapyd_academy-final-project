/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction,RequestHandler } from "express";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import {INVALID_FILED_VALUE,INDIVIDUAL_ID_LENGTH,MISSING_REQUIRED_FIELD, INVALID_FILED, ACCOUNT_ALREADY_EXIST} from '../types/constants.js';
import { IAccount, IIndividual, Statuses } from "../types/types.d.js";
import { validIndividualId } from "../utils/validationFunc.js";


export function validateIndividualModel(req:Request,res:Response,next:NextFunction):void {

    const {first_name,last_name,currency,account_id,individual_id,email,address,balance=0} = req.body;
    //const {city,street_name,street_number,region,country_name,country_code} = address;

    validateAccountMandatoryFields(currency as string,balance as number);

    if(!(first_name && last_name && currency && individual_id)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }

    if (account_id !== undefined) {
        throw new Error(INVALID_FILED);
    }    

    validIndividualId(INDIVIDUAL_ID_LENGTH,individual_id as number);

    const account:Partial <IIndividual> = {first_name,last_name,currency,individual_id,email,address,balance,status:Statuses.Active};
    req.accounts.push(account);
    console.log("Iaccount valid!",account);
    next()
}
