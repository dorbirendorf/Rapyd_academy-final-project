import { HttpError } from "./httpError.js";
export declare class HttpAccountDoesNotExistError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
