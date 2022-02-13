/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request,Router } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import business_service from "./business.services.js";
 import { IBusiness} from "../types/types.js"
import business_validator from "./business.validator.js";
import validation_func from "../utils/validationFunc.js";
import responseFactory from '../responses/responseFactory.js';

class BusinessRouter
{
  router:Router

  constructor(){
  this.router = express.Router();



// CREATES A NEW BUSINESS_ACOUNT
// eslint-disable-next-line @typescript-eslint/unbound-method
this.router.post("/",raw(business_validator.validateBusinessModel),raw( async (req:Request, res:Response) => {
    const id = await business_service.createBusinessAccount(req.accounts[0] as Partial<IBusiness>);
    const ans = await business_service.getBusinessAccountById(id);
    const resMessage= responseFactory.createResponse(ans,"Account created",201);
    res.status(resMessage.status).json(resMessage);
  }) );

  // GET FULL BUSINESS_ACOUNT BY ID
  this.router.get("/:id",raw(validation_func.validateAccountId),raw( async (req:Request, res:Response) => {
    const ans = await business_service.getBusinessAccountById(req.params.id);
    const resMessage= responseFactory.createResponse(ans,"Account found",201);
      res.status(resMessage.status).json(resMessage);
  }));
}}

const router = new BusinessRouter()
  export default router;
  