import { HttpError } from "./httpError.js";
export declare class HttpInvalidAmountError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
