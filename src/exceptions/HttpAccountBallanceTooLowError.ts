import { HttpError } from "./httpError.js";

export class HttpAccountBallanceTooLowError extends HttpError {
 
    constructor(public description: string|undefined) {
        super("Account balance too low",404);
    }
}
