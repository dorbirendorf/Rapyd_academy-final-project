
import { Request, Response, NextFunction } from "express";
import account_validation from "../account/account.validation.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import { IIndividualFromReq } from "../types/types.d.js";
import config from "../config.js";
import validtion_func from "../utils/validationFunc.js";
import errorFactory from "../exceptions/errorFactoryClass.js";
class IndividualValidator
{ 
    
    validateIndividualModel(req:Request,res:Response,next:NextFunction):void {

    try{const {first_name,last_name,currency,account_id,individual_id,email=null,address=null,balance=0,agent_id} = req.body;
    account_validation.validateAccountMandatoryFields(currency as string,balance as number,agent_id as number);
  
    if(!(first_name && last_name && currency && individual_id)){
        throw new InformativeError(config.errors.MISSING_REQUIRED_FIELD);
    }
    if(!(typeof first_name ==="string" && typeof last_name ==="string" && typeof currency === "string")){
        throw new InformativeError(config.errors.INVALID_FILED_VALUE,` type of first name, last name and currency should be string `);
    }

    if (account_id) {
        throw new InformativeError(config.errors.INVALID_FILED,`account_id must not be provided!`);
    }    
    //console.log("INDIVIDUAL_ID_LENGTH",config.configurations.INDIVIDUAL_ID_LENGTH,config.constants.INDIVIDUAL_ID_LENGTH);
    validtion_func.validEntityId (Number(config.configurations.INDIVIDUAL_ID_LENGTH),individual_id as number);
    const account:Partial <IIndividualFromReq> = {first_name,last_name,currency,individual_id,email,address,balance,status:true,agent_id};
    req.accounts=[account];
    next()}catch(error){
        next(errorFactory.createError(error as InformativeError))
    }
}

}

const validator = new IndividualValidator()
export default validator