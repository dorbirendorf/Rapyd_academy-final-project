/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as individual_service from "./individual.services.js";
import {IIndividual} from "../types/types.js"
import { validateIndividualModel } from "./individual.validator.js";
import { validateAccountId } from "../utils/validationFunc.js";
import responseFactory from "../responses/responseFactory.js";
const router = express.Router();



// CREATES A NEW INDIVIDUAL_ACOUNT
router.post("/",raw(validateIndividualModel),raw( async (req:Request, res:Response) => {
  const id = await individual_service.createIndividualAccount(req.accounts[0] as Partial<IIndividual>);
  const ans = await individual_service.getIndividualByAccountId(id.toString());
  const resMessage= responseFactory.createResponse(ans,"Account created",201);
    res.status(resMessage.status).json(resMessage);
}) );

// GET FULL INDIVIDUAL_ACOUNT BY ID
router.get("/:id",raw(validateAccountId) ,raw( async (req:Request, res:Response) => {
  const ans = await individual_service.getIndividualByAccountId(req.params.id);
  const resMessage= responseFactory.createResponse(ans,"Account found",201);
    res.status(resMessage.status).json(resMessage);
}));
  export default router;
  
