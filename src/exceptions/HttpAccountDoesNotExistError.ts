import { HttpError } from "./httpError.js";

export class HttpAccountDoesNotExistError extends HttpError {
 
    constructor(public description: string) {
        super("Account does not exist",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}