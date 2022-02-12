/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { validateAccountMandatoryFields } from "../account/account.validation.js";
import {INDIVIDUAL_ID_LENGTH,MISSING_REQUIRED_FIELD, INVALID_FILED, INVALID_FILED_VALUE} from '../types/constants.js';
import { IIndividual } from "../types/types.d.js";
import { validEntityId } from "../utils/validationFunc.js";


export async function validateIndividualModel(req:Request,res:Response,next:NextFunction):Promise<void> {

    const {first_name,last_name,currency,account_id,individual_id,email=null,address=null,balance=0,agent_id} = req.body;
    validateAccountMandatoryFields(currency as string,balance as number,agent_id as number);
  
    if(!(first_name && last_name && currency && individual_id)){
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    if(!(typeof first_name ==="string" && typeof last_name ==="string" && typeof currency === "string")){
        throw new Error(`${INVALID_FILED_VALUE} - type of first name, last name and currency should be string `);
    }

    if (account_id) {
        throw new Error(`${INVALID_FILED}-account_id must not be provided!`);
    }    

    validEntityId(INDIVIDUAL_ID_LENGTH,individual_id as number);

    const account:Partial <IIndividual> = {first_name,last_name,currency,individual_id,email,address,balance,status:true,agent_id};
    req.accounts=[account];
    next()
}

