import { HttpError } from "./httpError.js";

export class HttpChangeStatusFailed extends HttpError {
 
    constructor(public description: string) {
        super("Account status cant be change",404);
    }

    toString(): string {
        return `Status code: ${this.statusCode}, Message: ${this.message}, Description: ${this.description}
            Stack: ${this.stack as string}
            `;
    }
}