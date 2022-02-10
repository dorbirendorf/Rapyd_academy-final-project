/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { HttpAccountDoesNotExistError} from "./HttpAccountDoesNotExistError.js";
import {HttpError} from "./httpError.js";
import {HttpInvalidFieldError} from "./HttpInvalidFieldError.js"
import {HttpInvalidFieldValueError} from "./HttpInvalidFieldValueError.js";
import {HttpMissingRequieredFieldError} from "./HttpMissingRequieredFieldError.js"
import {HttpAccountBallanceTooLowError} from "./HttpAccountBallanceTooLowError.js"
import { HttpInvalidAmountError } from "./HttpInvalidAmountError.js";

class httpErrorFactoryClass{
    createError(message:string):HttpError{
        const spliteMessage = message.split("-");
        const type = spliteMessage[0].trim();
        const description = spliteMessage[1]?.trim()||"";

        switch(type) { 
            case "Invalid field": { 
               return new HttpInvalidFieldError(description);
            } 
            case "Invalid filed value": { 
                return new HttpInvalidFieldValueError(description);
            } 
            case "Missing requiered field": { 
                return new HttpMissingRequieredFieldError(description);
            } 
            case "Account does not exist": { 
                return new HttpAccountDoesNotExistError(description);
            } 
            case "Account ballance too low": { 
                return new HttpAccountBallanceTooLowError(description);
            } 
            case "Invalid amount": { 
                return new HttpInvalidAmountError(description);
            } 
            default: { 
               return new HttpError("somthing went wrong",500);
            } 
         }
    }
}

const errorFactory = new httpErrorFactoryClass();
export default errorFactory;