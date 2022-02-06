import { HttpError } from "./httpError.js";

export class HttpMissingRequieredFieldError extends HttpError {
 
    constructor(public description: string) {
        super("Missing requiered field",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}
