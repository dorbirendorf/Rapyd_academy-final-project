import { HttpError } from "./httpError.js";
export declare class HttpAccountBallanceTooLowError extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
