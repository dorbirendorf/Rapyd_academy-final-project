/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import * as individual_service from "./individual.services.js";
 import errorFactory from "../exceptions/errorFactoryClass.js"
const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW INDIVIDUAL_ACOUNT
router.post("/",raw( async (req:Request, res:Response) => {
    const ans = await individual_service.createIndividualAccount(req.body);
    res.status(200).json(ans);
  }) );

  // GET FULL INDIVIDUAL_ACOUNT BY ID
router.get("/:id",raw( async (req:Request, res:Response) => {
    const ans = await individual_service.getIndividualAccountById(req.params.id);
    if(ans === undefined){
     throw new Error("Invalid field - error message");
    }
    res.status(200).json(ans);
  }));

  export default router;
  
