/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request, Router } from "express";
import raw from "../middleware/route.async.wrapper.js";
import responseFactory from "../responses/responseFactory.js";
import { IFamily } from "../types/types.js";
import validation_func from "../utils/validationFunc.js";
import family_service from "./family.services.js";
import family_validator from "./family.validator.js";
import idempotency_Db from "../idempotency/idempotency.db.js";

class FamilyRouter {

  router: Router
  constructor() {
    this.router = express.Router();

    // CREATES A NEW FAMILY_ACOUNT
    this.router.post("/", family_validator.validateFamilyModel, raw(async (req: Request, res: Response) => {
      const ans = await family_service.createFamilyAccount(req.accounts[0] as Partial<IFamily>, req.body.owners, req.body.currency);
      const resMessage = responseFactory.createResponse(ans, "Account created", 201);
      await idempotency_Db.createInstanceOfResponse(resMessage,req.idempotency_key,req.agent_id);
      res.status(resMessage.status).json(resMessage);
    }));

    // GET FULL FAMILY_ACOUNT BY ID
    this.router.get("/full/:id", validation_func.validateAccountId, raw(async (req: Request, res: Response) => {
      const ans = await family_service.getFamilyAccountByIdFull(Number(req.params.id));
      const resMessage = responseFactory.createResponse(ans, "Account found", 201);
      res.status(resMessage.status).json(resMessage);
    }));

    // GET SHORT FAMILY_ACOUNT BY ID
    this.router.get("/short/:id", validation_func.validateAccountId, raw(async (req: Request, res: Response) => {
      const ans = await family_service.getFamilyAccountByIdShort(Number(req.params.id));
      const resMessage = responseFactory.createResponse(ans, "Account found", 201);
      res.status(resMessage.status).json(resMessage);
    }));

    // CLOSE FAMILY_ACOUNT BY ID - only if account empty 
    this.router.patch("/close/:id", validation_func.validateAccountId, raw(async (req: Request, res: Response) => {
      await family_service.closeFamilyAccount(Number(req.params.id));
      const resMessage = responseFactory.createResponse("", "success closing family", 201);
      await idempotency_Db.createInstanceOfResponse(resMessage,req.idempotency_key,req.agent_id);
      res.status(resMessage.status).json(resMessage);
    }));

    // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    this.router.post("/add/:format", raw(family_validator.validateUpdateAccounts), raw(async (req: Request, res: Response) => {
      const ans = await family_service.addIndividualsToFamilyAccount(req.body.account_id, req.body.owners, req.params.format);
      const resMessage = responseFactory.createResponse(ans, "success add inidividuals to family", 201);
      await idempotency_Db.createInstanceOfResponse(resMessage,req.idempotency_key,req.agent_id);
      res.status(resMessage.status).json(resMessage);
    }));

    // REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    this.router.put("/remove/:format", family_validator.validateUpdateAccounts, raw(async (req: Request, res: Response) => {
      const ans = await family_service.removeIndividualsFromFamilyAccount(req.body.account_id, req.body.owners, req.params.format);
      const resMessage = responseFactory.createResponse(ans, "remove add inidividuals from family", 201);
      await idempotency_Db.createInstanceOfResponse(resMessage,req.idempotency_key,req.agent_id);

      res.status(resMessage.status).json(resMessage);
    }));
  }
}
const router = new FamilyRouter()
export default router;
