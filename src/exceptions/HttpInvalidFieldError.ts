import { HttpError } from "./httpError.js";

export class HttpInvalidFieldError extends HttpError {
    constructor(public description: string|undefined) {
        super("Invalid filed",404);
    }
}