/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as business_service from "./business.services.js";
 import {httpResponseMessage} from "../types/types.js"
import { validateBusinessModel } from "./business.validator.js";

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW BUSINESS_ACOUNT
router.post("/",raw(validateBusinessModel),raw( async (req:Request, res:Response) => {
    const id = await business_service.createBusinessAccount(req.body);
    const ans = await business_service.getBusinessAccountById(id);
    const resMessage : httpResponseMessage ={
      status: 201,
      message: "Account created",
      data: ans};
      res.status(201).json(resMessage);
  }) );

  // GET FULL BUSINESS_ACOUNT BY ID
router.get("/:id",raw( async (req:Request, res:Response) => {
    const ans = await business_service.getBusinessAccountById(Number(req.params.id));
    const resMessage : httpResponseMessage ={
      status: 200,
      message: "Account found",
      data: ans};
      res.status(200).json(resMessage);
  }));


  export default router;
  