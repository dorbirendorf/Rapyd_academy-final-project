import { HttpError } from "./httpError.js";

export class HttpInvalidFieldValueError extends HttpError {
 
    constructor(public description: string) {
        super("Invalid filed value",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}