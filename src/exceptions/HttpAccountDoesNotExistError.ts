import { HttpError } from "./httpError.js";

export class HttpAccountDoesNotExistError extends HttpError {
 
    constructor(public description: string|undefined) {
        super("Account does not exist",404);
    }
}