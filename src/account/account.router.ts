/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import express, { Response, Request,Router } from "express";
import raw from "../middleware/route.async.wrapper.js";
import accountValidation from "./account.validation.js";
 import account_service from "./account.services.js"
import responseFactory from "../responses/responseFactory.js";


class AccountRouter{
  router: Router
  constructor(){
    this.router = express.Router();
    //ACTIVATE/DEACTIVATE ACCOUNT
this.router.patch("/",raw(accountValidation.validateStatus),raw( async (req:Request, res:Response) => {
  const ans = await account_service.updateAccountStatus(req.body.accounts,req.body.action);
  const resMessage= responseFactory.createResponse(ans,"accounts status update comleted",201);
    res.status(resMessage.status).json(resMessage);
  }));
  
// eslint-disable-next-line @typescript-eslint/unbound-method
this.router.post("/transfer/b2b",raw(accountValidation.validateTransferModel),raw( async (req:Request, res:Response) => {
let ans = await account_service.transferB2B(req.body);
const resMessage= responseFactory.createResponse(ans,"transfer B2B comleted",201);
  res.status(resMessage.status).json(resMessage);
}));

// eslint-disable-next-line @typescript-eslint/unbound-method
this.router.post("/transfer/b2bfx",raw(accountValidation.validateTransferModel),raw( async (req:Request, res:Response) => {
const ans = await account_service.transferB2BFX(req.body);
const resMessage= responseFactory.createResponse(ans,"transfer B2BFX comleted",201);
  res.status(resMessage.status).json(resMessage);
}));

// eslint-disable-next-line @typescript-eslint/unbound-method
this.router.post("/transfer/b2i",raw(accountValidation.validateTransferModel),raw( async (req:Request, res:Response) => {
  const ans = await account_service.transferB2I(req.body);
  const resMessage= responseFactory.createResponse(ans,"transfer B2I comleted",201);
    res.status(resMessage.status).json(resMessage);
}));

// eslint-disable-next-line @typescript-eslint/unbound-method
this.router.post("/transfer/f2b",raw(accountValidation.validateTransferModel),raw( async (req:Request, res:Response) => {
  const ans = await account_service.transferF2B(req.body);
  const resMessage= responseFactory.createResponse(ans,"transfer F2B comleted",201);
    res.status(resMessage.status).json(resMessage);
}));

  }



}
const router = new AccountRouter()

  export default router;
  
