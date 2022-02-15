import { HttpError } from "./httpError.js";

export class HttpChangeStatusFailed extends HttpError {
    constructor(public description: string | undefined) {
        super("Account status cant be change", 404);
    }
}
