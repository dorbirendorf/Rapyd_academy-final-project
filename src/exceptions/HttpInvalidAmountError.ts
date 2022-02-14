import { HttpError } from "./httpError.js";

export class HttpInvalidAmountError extends HttpError {
 
    constructor(public description: string|undefined) {
        super("amount restrictation",404);
    }
}