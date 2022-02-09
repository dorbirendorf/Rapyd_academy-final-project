import { HttpError } from "./httpError.js";
declare class httpErrorFactoryClass {
    createError(message: string): HttpError;
}
declare const errorFactory: httpErrorFactoryClass;
export default errorFactory;
