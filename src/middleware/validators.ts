import raw from "./route.async.wrapper.js";
import { NextFunction, Response, Request } from "express";
import ValidatorFactoty from "../types/validation.js"

export const isvalid = raw(
    (req: Request, res: Response, next: NextFunction) => {
    const {type} = req.bodyl; //to get type of validator to create (b2b,b2c,Facountt ,etc.. ) 
    const validator = ValidatorFactory(req.body.type);
    validator.validate();
    next()
    })