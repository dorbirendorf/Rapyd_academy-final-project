import { RequestHandler } from "express";
import errorFactory from "../exceptions/errorFactoryClass.js";

export default (fn: RequestHandler): RequestHandler =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch((error)=>{
            next(errorFactory.createError(error.message as string))});
