import { NextFunction, RequestHandler, Request, Response } from "express";
export declare function addIdToReq(req: Request, res: Response, next: NextFunction): void;
export declare function logRequest(): RequestHandler;
