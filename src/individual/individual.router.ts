/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as individual_service from "./individual.services.js";
import {httpResponseMessage, IAccount, IIndividual} from "../types/types.js"
import { validateIndividualModel } from "./individual.validator.js";
const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW INDIVIDUAL_ACOUNT
router.post("/",raw(validateIndividualModel),raw( async (req:Request, res:Response) => {
  const id = await individual_service.createIndividualAccount(req.accounts[0] as Partial<IIndividual>);
  const ans = await individual_service.getIndividualAccountById(id.toString());
  const resMessage : httpResponseMessage ={
    status: 201,
    message: "Account created",
    data: ans}; 
    res.status(201).json(resMessage);
}) );

// GET FULL INDIVIDUAL_ACOUNT BY ID
router.get("/:id",raw( async (req:Request, res:Response) => {
  const ans = await individual_service.getIndividualAccountById(Number(req.params.id));
  const resMessage : httpResponseMessage ={
    status: 200,
    message: "Account found",
    data: ans};
    res.status(200).json(resMessage);
}));

  export default router;
  
