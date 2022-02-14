import { HttpError } from "./httpError.js";

export class HttpMissingRequieredFieldError extends HttpError {
 
    constructor(public description: string|undefined) {
        super("Missing requiered field",404);
    }
}
