import { HttpError } from "./httpError.js";

export class HttpUnAceptableTransfer extends HttpError {
 
    constructor(public description: string|undefined) {
        super("Transfer not allowed",404);
    }
}
