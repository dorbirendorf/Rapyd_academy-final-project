import fs from "fs";
import { NextFunction, RequestHandler, Request, Response } from "express";
import utils from "../utils/utils.js";

class UserFunctions {
    addIdToReq(req: Request, res: Response, next: NextFunction): void {
        req.id = utils.generateID();
        next();
    }

    logRequest(): RequestHandler {
        const requestsFileLogger = fs.createWriteStream("./src/log/http.log", {
            flags: "a+",
        });
        return function (
            req: Request,
            res: Response,
            next: NextFunction
        ): void {
            requestsFileLogger.write(
                `${req.method} , ${req.originalUrl} , ${
                    req.id
                } -- ${utils.getTimeString()}\n`
            );
            next();
        };
    }
}

const func = new UserFunctions();
export default func;
