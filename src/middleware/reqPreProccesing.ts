import { generateID, getTimeString } from "../utils.js";
import fs from "fs";
import { NextFunction, RequestHandler ,Request , Response, } from "express";

const LOGGERPATH = `${process.cwd()}/requests_log.txt`;

export const addIdToReq: RequestHandler = (req, res, next) => {
    req.id = generateID();
    next();
};
// export const logRequest: RequestHandler = (req, res, next) => {
//     fs.writeFile(
//         LOGGERPATH,
//         `${req.method} , ${req.originalUrl} , ${
//             req.id
//         } -- ${getTimeString()}\n`,
//         {
//             flag: "a",
//         }
//     );
//     next();
// };
export const logRequest = ()=>{
    const requestsFileLogger = fs.createWriteStream("./src/server/log/error.log", { flags: "a" });
    return (err:Error, req: Request, res: Response, next: NextFunction) => {
        requestsFileLogger.write(`${req.id} : ${err.message} >> ${err.stack} \n`);
        next(err);
    }
}
