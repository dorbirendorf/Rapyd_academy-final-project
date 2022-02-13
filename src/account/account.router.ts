/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
import { validateStatus, validateTransferModel } from "./account.validation.js";
 import * as account_service from "./account.services.js"
import responseFactory from "../responses/responseFactory.js";

 const router = express.Router();


//ACTIVATE/DEACTIVATE ACCOUNT
router.patch("/",raw(validateStatus),raw( async (req:Request, res:Response) => {
    const ans = await account_service.updateAccountStatus(req.body.accounts,req.body.action);
    const resMessage= responseFactory.createResponse(ans,"accounts status update comleted",201);
      res.status(resMessage.status).json(resMessage);
    }));
    
  //TRANSFER ACCOUNT B2B
router.post("/transfer/b2b",raw(validateTransferModel),raw( async (req:Request, res:Response) => {
  let ans = await account_service.transferB2B(req.body);
  const resMessage= responseFactory.createResponse(ans,"transfer B2B comleted",201);
    res.status(resMessage.status).json(resMessage);
}));

//TRANSFER ACCOUNT B2BFX
router.post("/transfer/b2bfx",raw(validateTransferModel),raw( async (req:Request, res:Response) => {
  const ans = await account_service.transferB2BFX(req.body);
  const resMessage= responseFactory.createResponse(ans,"transfer B2BFX comleted",201);
    res.status(resMessage.status).json(resMessage);
}));

  //TRANSFER ACCOUNT B2I
  router.post("/transfer/b2i",raw(validateTransferModel),raw( async (req:Request, res:Response) => {
    const ans = await account_service.transferB2I(req.body);
    const resMessage= responseFactory.createResponse(ans,"transfer B2I comleted",201);
      res.status(resMessage.status).json(resMessage);
  }));

   //TRANSFER ACCOUNT F2B
   router.post("/transfer/f2b",raw(validateTransferModel),raw( async (req:Request, res:Response) => {
    const ans = await account_service.transferF2B(req.body);
    const resMessage= responseFactory.createResponse(ans,"transfer F2B comleted",201);
      res.status(resMessage.status).json(resMessage);
  }));

  

  export default router;
  
