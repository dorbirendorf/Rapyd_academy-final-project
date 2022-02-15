import { ErrorRequestHandler, RequestHandler,NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { HttpError } from "../exceptions/httpError.js";
import utils from "../utils/utils.js";
import { httpResponseMessage } from "../types/types.js";
import idempotency_Db from "../idempotency/idempotency.db.js";

const ERRLOGGERPATH = "./src/log/error.log";
class ErrorHandlers {
    logError: ErrorRequestHandler = async (
        err: HttpError,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        await fs.writeFile(
            ERRLOGGERPATH,
            `${req.id} -- ${utils.getTimeString()} \n --> ${
                err.stack as string
            }\n`,
            { flag: "a" }
        );
        next(err);
    };

    async sendErrorMessage(
        error: HttpError,
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const resMessage: httpResponseMessage = {
            status: error.statusCode,
            message: error.message,
            data: error.description || "",
        };
        if (error.statusCode === 20000) {
            next();
        }
        if (req.idempotency_key) {
            await idempotency_Db.createInstanceOfResponse(
                resMessage,
                req.idempotency_key,
                req.agent_id
            );
        }
        res.status(error.statusCode || 500).json(resMessage);
    }

     not_found: RequestHandler = (req, res) => {
        res.status(404).json({ status: `url: ${req.url} not found...` });
    };
}



const error_handlers = new ErrorHandlers();
export default error_handlers;
