/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as individual_service from "./individual.services.js";
import {httpResponseMessage, IIndividual} from "../types/types.js"
import { validateIndividualModel } from "./individual.validator.js";
import { validateAccountId } from "../utils/validationFunc.js";
const router = express.Router();



// CREATES A NEW INDIVIDUAL_ACOUNT
router.post("/",raw(validateIndividualModel),raw( async (req:Request, res:Response) => {
  const id = await individual_service.createIndividualAccount(req.accounts[0] as Partial<IIndividual>);
  const ans = await individual_service.getIndividualByAccountId(id.toString());
  const resMessage : httpResponseMessage ={
    status: 201,
    message: "Account created",
    data: ans}; 
    res.status(201).json(resMessage);
}) );

// GET FULL INDIVIDUAL_ACOUNT BY ID
router.get("/:id",raw(validateAccountId) ,raw( async (req:Request, res:Response) => {
  const ans = await individual_service.getIndividualByAccountId(req.params.id);
  const resMessage : httpResponseMessage ={
    status: 200,
    message: "Account found",
    data: ans};
    res.status(200).json(resMessage);
}));

  export default router;
  
