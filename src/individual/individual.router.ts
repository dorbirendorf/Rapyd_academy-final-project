import express, { Response, Request, Router,NextFunction } from "express";
import raw from "../middleware/route.async.wrapper.js";
 import individual_service from "./individual.services.js";
import {IIndividual} from "../types/types.js"
import individual_validator from "./individual.validator.js";
import validation_func from "../utils/validationFunc.js";
import responseFactory from "../responses/responseFactory.js";
import idempotency_Db from "../idempotency/idempotency.db.js";
class IndividualRouter
{

  router:Router
  constructor(){
  this.router = express.Router();



// CREATES A NEW INDIVIDUAL_ACOUNT
this.router.post("/",(req: Request, res: Response, next: NextFunction) =>{individual_validator.validateIndividualModel(req,res,next)},raw( async (req:Request, res:Response) => {
  const id = await individual_service.createIndividualAccount(req.accounts[0] as Partial<IIndividual>);
  const ans = await individual_service.getIndividualByAccountId(String(id));
  const resMessage= responseFactory.createResponse(ans,"Account created",201);
  if (req.idempotency_key) {
    await idempotency_Db.createInstanceOfResponse(resMessage, req.idempotency_key, req.agent_id);
  }    res.status(resMessage.status).json(resMessage);
}) );

// GET FULL INDIVIDUAL_ACOUNT BY ID
this.router.get("/:id",(req: Request, res: Response, next: NextFunction) =>{validation_func.validateAccountId(req,res,next)} ,raw( async (req:Request, res:Response) => {
  const ans = await individual_service.getIndividualByAccountId(req.params.id);
  const resMessage= responseFactory.createResponse(ans,"Account found",201);
    res.status(resMessage.status).json(resMessage);
}));
}} 
const router = new IndividualRouter()
export default router;
  
