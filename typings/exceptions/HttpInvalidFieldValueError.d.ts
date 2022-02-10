import { HttpError } from "./httpError.js";
export declare class HttpInvalidFieldValueError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
