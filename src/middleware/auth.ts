import {createSignture} from "../utils/utils.js"
import {getSecretKeyByAccessKey} from "../account/account.services.js"
import { Request,Response,NextFunction } from "express";
import { NOT_AUTHORIZED } from "../types/constants.js";

export const auth = 
    async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        const reqSignture = req.headers["x-signture"];
        const access_key  = req.headers["x-access_key"];
        const timeStamp   = Number(req.headers["x-timeStamp"]) || undefined; 

        const secret = getSecretKeyByAccessKey(access_key);
        const signature2 =  createSignture(req.body as Object,secret as string,timeStamp);

        const signturesMatch = (reqSignture===signature2);
        
        if (!reqSignture || !access_key  || !signturesMatch){
            throw new Error(NOT_AUTHORIZED)

         }

        next();
    }
;




// import raw from "./route.async.wrapper.js";
// import { NextFunction, Response, Request } from "express";
// import jwt from "jsonwebtoken";

// const { APP_SECRET = "" } = process.env;

// export const auth = raw(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers["x-access-token"];

//         if (!token)
//             return res.status(403).json({
//                 status: "Unauthorized",
//                 payload: "No token provided.",
//             });

//         // verifies secret and checks exp
//         await jwt.verify(token as string, APP_SECRET);

//         next();
//     }
// );

// export const isOneOfRole =(acceptedRoles:string[])=> raw(
//     async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers["x-access-token"];
//     if (!token){
//         return res.status(403).json({
//             status: "Unauthorized",
//             payload: "No token provided.",
//         });
//     }

//     const {role,id} = jwt.verify(token as string, APP_SECRET);
//     const permissions = role.split(";");
//     const hasPermission = permissions.some((p:string)=>acceptedRoles.includes(p));
//     if(hasPermission){
//         next();
//         return;
//     }
//     return res.status(403).json({
//         status: "Unauthorized",
//         payload: "You shell not pass.",
//     });

// });
