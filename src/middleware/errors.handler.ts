import {ErrorRequestHandler,NextFunction,Request,Response} from "express";
import fs from "fs/promises";
import { HttpError } from "../exceptions/httpError.js";
import utils from "../utils/utils.js";
import {httpResponseMessage} from "../types/types.js"

const ERRLOGGERPATH = "./src/log/error.log";
class ErrorHandlers
{

logError: ErrorRequestHandler = async (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await fs.writeFile(
        ERRLOGGERPATH,
        `${req.id} -- ${utils.getTimeString()} \n --> ${err.stack as string}\n`,
        { flag: "a" }
    );
    next(err);
};

  sendErrorMessage(error: HttpError, req: Request, res: Response, next: NextFunction):void{
     const resMessage : httpResponseMessage ={
         status: error.statusCode,
         message: error.message,
         data: error.description || ""};
     res.status(error.statusCode|| 500 ).json(resMessage);
 }
}

// export const not_found: RequestHandler = (req, res) => {
//     log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
//     res.status(404).json({ status: `url: ${req.url} not found...` });
// };

const error_handlers = new ErrorHandlers()
export default error_handlers;