
import { HttpAccountDoesNotExistError} from "./HttpAccountDoesNotExistError.js";
import {HttpError} from "./httpError.js";
import {HttpInvalidFieldError} from "./HttpInvalidFieldError.js"
import {HttpInvalidFieldValueError} from "./HttpInvalidFieldValueError.js";
import {HttpMissingRequieredFieldError} from "./HttpMissingRequieredFieldError.js"
import {HttpAccountBallanceTooLowError} from "./HttpAccountBallanceTooLowError.js"
import { HttpInvalidAmountError } from "./HttpInvalidAmountError.js";
import { HttpDataNotFound } from "./HttpDataNotFoundError.js";
import config from "../config.js"
import { HttpChangeStatusFailed } from "./HttpChangeStatusFailed.js";
import { InformativeError } from "./InformativeError.js";
class httpErrorFactoryClass{
    createError(error:InformativeError):HttpError{
        const type = error.message
        const description = error.description as string

        switch(type) { 
            case config.errors.INVALID_FILED: { 
               return new HttpInvalidFieldError(description);
            } 
            case config.errors.INVALID_FILED_VALUE: { 
                return new HttpInvalidFieldValueError(description);
            } 
            case config.errors.MISSING_REQUIRED_FIELD: { 
                return new HttpMissingRequieredFieldError(description);
            } 
            case config.errors.ACCOUNT_NOT_EXIST: { 
                return new HttpAccountDoesNotExistError(description);
            } 
            case config.errors.ACCOUNT_BALLANCE_LOW: { 
                return new HttpAccountBallanceTooLowError(description);
            }
            case config.errors.DATA_NOT_FOUND: {
                return new HttpDataNotFound(description);
            } 
            case config.errors.INVALID_AMOUNT_VALUE: { 
                return new HttpInvalidAmountError(description);
            } 
            case config.errors.ACCOUNT_STATUS_FIELD: { 
                return new HttpChangeStatusFailed(description);
            } 
            default: { 
               return new HttpError(String(config.errors.SOMTHING_WENT_WRONG),500);
            } 
         }
    }
}

const errorFactory = new httpErrorFactoryClass();
export default errorFactory;