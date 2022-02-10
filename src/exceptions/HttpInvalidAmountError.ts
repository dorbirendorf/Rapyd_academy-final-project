import { HttpError } from "./httpError.js";

export class HttpInvalidAmountError extends HttpError {
 
    constructor(public description: string) {
        super("amount restrictation",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}