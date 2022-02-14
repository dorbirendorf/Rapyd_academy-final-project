/* eslint-disable @typescript-eslint/require-await */
import { Request, Response, NextFunction} from "express";
import account_validation from "../account/account.validation.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import {IBusinessFromReq } from "../types/types.d.js";
import config from "../config.js";
import logger from "../utils/logger.js";
import validation_func from "../utils/validationFunc.js";
class BusinessValidator
{ async  validateBusinessModel(req:Request,res:Response,next:NextFunction):Promise<void> {
    try{

        const {company_id,company_name,context=null,currency,account_id,address=null,balance=0,agent_id} = req.body;
        account_validation.validateAccountMandatoryFields(currency as string,balance as number,agent_id as number);
    
        if(!(company_id && company_name)){
            throw new InformativeError(String(config.errors.MISSING_REQUIRED_FIELD),"");
        }
        if (account_id !== undefined) {
            throw new InformativeError(String(config.errors.INVALID_FILED),`account_id must not be provided!`);
        }  
        validation_func.validEntityId(Number(config.configurations.COMPANY_ID_LENGTH),company_id as number);
        
        const account:Partial <IBusinessFromReq> = {company_id,company_name,currency,context,address,balance,status:true,agent_id};
        req.accounts=[account];
        console.log("valid",account)
        next()
    }catch(err){
        logger.error("validateBusinessModel",err as Error);
        throw err

    }
}}

const validator = new BusinessValidator()
export default validator;