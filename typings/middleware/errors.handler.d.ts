import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/httpError.js";
export declare const logError: ErrorRequestHandler;
export declare function sendErrorMessage(error: HttpError, req: Request, res: Response, next: NextFunction): void;
