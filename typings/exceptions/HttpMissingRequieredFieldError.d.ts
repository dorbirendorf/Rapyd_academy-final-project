import { HttpError } from "./httpError.js";
export declare class HttpMissingRequieredFieldError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
