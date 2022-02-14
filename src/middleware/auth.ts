import utils from "../utils/utils.js"
import account_service from "../account/account.services.js"
import { Request,Response,NextFunction } from "express";
import config from "../config.js"
const { NOT_AUTHORIZED } =config;
import logger from "../utils/logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";

class Auth
{

  auth = 
    async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try{

            logger.params("auth-middleware",{})
            const reqSignature = req.headers["x-signature"];
            const access_key  = req.headers["x-access_key"];
            const timeStamp   = req.headers["x-time"];
            
    
            const timeout = utils.hasTimeout(Number(timeStamp),1000);
    
    
            const secret =await account_service.getSecretKeyByAccessKey(access_key as string);
            const serverSignature =  utils.createsignature((req.body || {} )as Object,secret ,timeStamp as string);
            const signaturesMatch = (reqSignature===serverSignature);
            if (timeout || !reqSignature || !access_key  || !signaturesMatch){
                throw new InformativeError(NOT_AUTHORIZED)
    
             }
            next();
        }catch(err){
            logger.error("auth-middleware",err as Error)
            throw err
        }
        logger.funcRet("auth-middleware","authenticated")
    };



}
const auth = new Auth()

export default auth