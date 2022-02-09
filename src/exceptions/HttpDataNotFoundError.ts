import { HttpError } from "./httpError.js";

export class HttpDataNotFound extends HttpError {
 
    constructor(public description: string) {
        super("Data not found",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}