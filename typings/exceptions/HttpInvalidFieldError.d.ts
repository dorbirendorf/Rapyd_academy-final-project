import { HttpError } from "./httpError.js";
export declare class HttpInvalidFieldError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
