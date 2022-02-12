/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpAccountDoesNotExistError} from "./HttpAccountDoesNotExistError.js";
import {HttpError} from "./httpError.js";
import {HttpInvalidFieldError} from "./HttpInvalidFieldError.js"
import {HttpInvalidFieldValueError} from "./HttpInvalidFieldValueError.js";
import {HttpMissingRequieredFieldError} from "./HttpMissingRequieredFieldError.js"
import {HttpAccountBallanceTooLowError} from "./HttpAccountBallanceTooLowError.js"
import { HttpInvalidAmountError } from "./HttpInvalidAmountError.js";
import { HttpDataNotFound } from "./HttpDataNotFoundError.js";
import {INVALID_FILED,INVALID_AMOUNT_VALUE,MISSING_REQUIRED_FIELD,ACCOUNT_NOT_EXIST,ACCOUNT_ALREADY_EXIST,ACCOUNT_BALLANCE_LOW,DATA_NOT_FOUND,SOMTHING_WENT_WRONG,NOT_AUTHORIZED, INVALID_FILED_VALUE} from "../types/constants.js"
class httpErrorFactoryClass{
    createError(message:string):HttpError{
        const spliteMessage = message.split("-");
        const type = spliteMessage[0].trim();
        const description = spliteMessage[1]?.trim()||"";

        switch(type) { 
            case INVALID_FILED: { 
               return new HttpInvalidFieldError(description);
            } 
            case INVALID_FILED_VALUE: { 
                return new HttpInvalidFieldValueError(description);
            } 
            case MISSING_REQUIRED_FIELD: { 
                return new HttpMissingRequieredFieldError(description);
            } 
            case ACCOUNT_NOT_EXIST: { 
                return new HttpAccountDoesNotExistError(description);
            } 
            case ACCOUNT_BALLANCE_LOW: { 
                return new HttpAccountBallanceTooLowError(description);
            }
            case DATA_NOT_FOUND: {
                return new HttpDataNotFound(description);
            } 
            case INVALID_AMOUNT_VALUE: { 
                return new HttpInvalidAmountError(description);
            } 
            default: { 
               return new HttpError(SOMTHING_WENT_WRONG,500);
            } 
         }
    }
}

const errorFactory = new httpErrorFactoryClass();
export default errorFactory;