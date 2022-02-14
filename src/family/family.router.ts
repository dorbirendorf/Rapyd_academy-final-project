
import express, { Response, Request, Router,NextFunction } from "express";
import raw from "../middleware/route.async.wrapper.js";
import responseFactory from "../responses/responseFactory.js";
import { IFamily, IFamilyForCreation } from "../types/types.js";
import validation_func from "../utils/validationFunc.js";
import family_service from "./family.services.js";
import family_validator from "./family.validator.js";
import idempotency_Db from "../idempotency/idempotency.db.js";

class FamilyRouter {

  router: Router
  constructor() {
    this.router = express.Router();

    // CREATES A NEW FAMILY_ACOUNT
    this.router.post("/", (req: Request, res: Response, next: NextFunction) =>{family_validator.validateFamilyModel(req,res,next)}, raw(async (req: Request, res: Response) => {
      const body = req.body as IFamilyForCreation
      const ans = await family_service.createFamilyAccount(req.accounts[0] as Partial<IFamily>, body.owners, body.currency);
      const resMessage = responseFactory.createResponse(ans, "Account created", 201);
      if (req.idempotency_key) {
        await idempotency_Db.createInstanceOfResponse(resMessage, req.idempotency_key, req.agent_id);
      }      res.status(resMessage.status).json(resMessage);
    }));

    // GET FULL FAMILY_ACOUNT BY ID
    this.router.get("/full/:id", (req: Request, res: Response, next: NextFunction) =>{validation_func.validateAccountId(req,res,next)}, raw(async (req: Request, res: Response) => {
      const ans = await family_service.getFamilyAccountByIdFull(Number(req.params.id));
      const resMessage = responseFactory.createResponse(ans, "Account found", 201);
      res.status(resMessage.status).json(resMessage);
    }));

    // GET SHORT FAMILY_ACOUNT BY ID
    this.router.get("/short/:id", (req: Request, res: Response, next: NextFunction) =>{validation_func.validateAccountId(req,res,next)}, raw(async (req: Request, res: Response) => {
      const ans = await family_service.getFamilyAccountByIdShort(Number(req.params.id));
      const resMessage = responseFactory.createResponse(ans, "Account found", 201);
      res.status(resMessage.status).json(resMessage);
    }));

    // CLOSE FAMILY_ACOUNT BY ID - only if account empty 
    this.router.patch("/close/:id", (req: Request, res: Response, next: NextFunction) =>{validation_func.validateAccountId(req,res,next)}, raw(async (req: Request, res: Response) => {
      await family_service.closeFamilyAccount(Number(req.params.id));
      const resMessage = responseFactory.createResponse("", "success closing family", 201);
      if (req.idempotency_key) {
        await idempotency_Db.createInstanceOfResponse(resMessage, req.idempotency_key, req.agent_id);
      }      res.status(resMessage.status).json(resMessage);
    }));

    // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    this.router.post("/add/:format", (req: Request, res: Response, next: NextFunction) =>{family_validator.validateUpdateAccounts(req,res,next)}, raw(async (req: Request, res: Response) => {
      const body = req.body as IFamilyForCreation
      const ans = await family_service.addIndividualsToFamilyAccount(body.account_id, body.owners, req.params.format);
      const resMessage = responseFactory.createResponse(ans, "success add inidividuals to family", 201);
      if (req.idempotency_key) {
        await idempotency_Db.createInstanceOfResponse(resMessage, req.idempotency_key, req.agent_id);
      }      res.status(resMessage.status).json(resMessage);
    }));

    // REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    this.router.put("/remove/:format", (req: Request, res: Response, next: NextFunction) =>{family_validator.validateUpdateAccounts(req,res,next)}, raw(async (req: Request, res: Response) => {
      const body = req.body as IFamilyForCreation
      const ans = await family_service.removeIndividualsFromFamilyAccount(body.account_id, body.owners, req.params.format);
      const resMessage = responseFactory.createResponse(ans, "remove add inidividuals from family", 201);
      if (req.idempotency_key) {
        await idempotency_Db.createInstanceOfResponse(resMessage, req.idempotency_key, req.agent_id);
      }
      res.status(resMessage.status).json(resMessage);
    }));
  }
}
const router = new FamilyRouter()
export default router;
