/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import log from "@ajar/marker";
import {ErrorRequestHandler,NextFunction,Request,RequestHandler,Response} from "express";
import fs from "fs/promises";
import { HttpError } from "../exceptions/httpError.js";
import { getTimeString } from "../utils/utils.js";
import {httpResponseMessage} from "../types/types.js"

const { White, Reset, Red } = log.constants;
const { NODE_ENV } = process.env;

const ERRLOGGERPATH = "./src/log/error.log";

export const logError: ErrorRequestHandler = async (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await fs.writeFile(
        ERRLOGGERPATH,
        `${req.id} -- ${getTimeString()} \n --> ${err.stack as string}\n`,
        { flag: "a" }
    );
    next(err);
};

export function sendErrorMessage(error: HttpError, req: Request, res: Response, next: NextFunction):void{
     const resMessage : httpResponseMessage ={
         status: error.statusCode,
         message: error.message,
         data: error.description || ""};
     res.status(error.statusCode|| 500 ).json(resMessage);
 }


// export const not_found: RequestHandler = (req, res) => {
//     log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
//     res.status(404).json({ status: `url: ${req.url} not found...` });
// };
