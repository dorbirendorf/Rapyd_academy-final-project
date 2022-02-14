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
import {INVALID_FILED,INVALID_AMOUNT_VALUE,MISSING_REQUIRED_FIELD,ACCOUNT_NOT_EXIST,ACCOUNT_BALLANCE_LOW,DATA_NOT_FOUND,SOMTHING_WENT_WRONG, INVALID_FILED_VALUE, ACCOUNT_STATUS_FIELD} from "../types/constants.js"
import { HttpChangeStatusFailed } from "./HttpChangeStatusFailed.js";
import { InformativeError } from "./InformativeError.js";
class httpErrorFactoryClass{
    createError(error:InformativeError):HttpError{
        const type = error.message
        const description = error.description

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
            case ACCOUNT_STATUS_FIELD: { 
                return new HttpChangeStatusFailed(description);
            } 
            default: { 
               return new HttpError(SOMTHING_WENT_WRONG,500);
            } 
         }
    }
}

const errorFactory = new httpErrorFactoryClass();
export default errorFactory;