import { HttpError } from "./httpError.js";

export class HttpInvalidFieldValueError extends HttpError {
    constructor(public description: string | undefined) {
        super("Invalid filed value", 404);
    }
}
