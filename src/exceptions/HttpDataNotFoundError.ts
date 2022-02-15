import { HttpError } from "./httpError.js";

export class HttpDataNotFound extends HttpError {
    constructor(public description: string | undefined) {
        super("Data not found", 404);
    }
}
