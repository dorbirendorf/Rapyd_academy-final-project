/* eslint-disable semi */
import fs from "fs";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { generateID, getTimeString } from "../utils.js";


export function addIdToReq(req:Request, res:Response, next:NextFunction):void {
    req.id = generateID();
    next(); 
}

export function logRequest() : RequestHandler {
    const requestsFileLogger = fs.createWriteStream("./src/log/http.log", { flags: 'a' });
    return function (req: Request, res: Response, next: NextFunction) : void {
        requestsFileLogger.write(`${req.method} , ${req.originalUrl} , ${req.id} -- ${getTimeString()}\n`);
        next();
    };
  }
