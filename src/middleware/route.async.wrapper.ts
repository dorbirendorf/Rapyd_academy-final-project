import { RequestHandler,NextFunction,Response,Request} from "express";
import errorFactory from "../exceptions/errorFactoryClass.js";
import { InformativeError } from "../exceptions/InformativeError.js";

type AsyncReqHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default (fn: RequestHandler|AsyncReqHandler): RequestHandler =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch((error)=>{
            next(errorFactory.createError(error as InformativeError))});
