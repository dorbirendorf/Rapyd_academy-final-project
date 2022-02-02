import { NextFunction, Response, Request } from "express";
import { object, string } from "yup";
import raw from "../middleware/route.async.wrapper.js";

const userSchema = object({ 
    email: string().email(),
    password: string().required().max(20).min(2),
});

export const validateUser = raw(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = req.body;
        //await userSchema.validate(user);
        req.user = user;
        next();
    }
);
