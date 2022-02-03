/* eslint-disable semi */
import fs from "fs";
import { NextFunction, RequestHandler ,Request , Response, } from "express";
import { generateID, getTimeString } from "../utils.js";

export const addIdToReq: RequestHandler = (req, res, next) => {
    req.id = generateID();
    next();
};

export const logRequest = ()=>{
    const requestsFileLogger = fs.createWriteStream("./src/log/http.log", { flags: "a" });
    return (req: Request, res: Response, next: NextFunction) => {
        requestsFileLogger.write(`${req.method} , ${req.originalUrl} , ${req.id} -- ${getTimeString()}\n`);
        next();
    }
}
