import { HttpError } from "./httpError.js";
export declare class HttpDataNotFound extends HttpError {
    description: string;
    constructor(description: string);
    toString(): string;
}
