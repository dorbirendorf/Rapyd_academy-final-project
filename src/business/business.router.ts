/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as business_service from "./business.services.js";
 import { IBusiness} from "../types/types.js"
import { validateBusinessModel } from "./business.validator.js";
import { validateAccountId } from "../utils/validationFunc.js";
import responseFactory from '../responses/responseFactory.js';

const router = express.Router();



// CREATES A NEW BUSINESS_ACOUNT
router.post("/",raw(validateBusinessModel),raw( async (req:Request, res:Response) => {
    const id = await business_service.createBusinessAccount(req.accounts[0] as Partial<IBusiness>);
    const ans = await business_service.getBusinessAccountById(id);
    const resMessage= responseFactory.createResponse(ans,"Account created",201);
    res.status(resMessage.status).json(resMessage);
  }) );

  // GET FULL BUSINESS_ACOUNT BY ID
router.get("/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
    const ans = await business_service.getBusinessAccountById(req.params.id);
    const resMessage= responseFactory.createResponse(ans,"Account found",201);
      res.status(resMessage.status).json(resMessage);
  }));


  export default router;
  