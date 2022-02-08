import { INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } from "../types/constants.js";


export function validateAccountMandatoryFields(currency:string,balance:number):void {
   
    if (currency === undefined) {
        throw new Error(MISSING_REQUIRED_FIELD);
    }
    if (balance === undefined) {
        throw new Error(MISSING_REQUIRED_FIELD);
    }
    if (balance < 0) {
        throw new Error(INVALID_FILED_VALUE);
    }
 }

