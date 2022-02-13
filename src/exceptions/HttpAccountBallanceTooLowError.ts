import { HttpError } from "./httpError.js";

export class HttpAccountBallanceTooLowError extends HttpError {
 
    constructor(public description: string) {
        super("Account balance too low",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}
