/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
import responseFactory from "../responses/responseFactory.js";
import { IFamily } from "../types/types.js";
import { validateAccountId } from "../utils/validationFunc.js";
 import * as family_service from "./family.services.js";
 import { validateFamilyModel, validateUpdateAccounts } from "./family.validator.js"

const router = express.Router();

// CREATES A NEW FAMILY_ACOUNT
router.post("/",raw(validateFamilyModel),raw( async (req:Request, res:Response) => {
const ans = await family_service.createFamilyAccount(req.accounts[0] as Partial<IFamily>,req.body.owners,req.body.currency);
const resMessage= responseFactory.createResponse(ans,"Account created",201);
  res.status(resMessage.status).json(resMessage);
  }));

  // GET FULL FAMILY_ACOUNT BY ID
router.get("/full/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
    const ans = await family_service.getFamilyAccountByIdFull(Number(req.params.id));
    const resMessage= responseFactory.createResponse(ans,"Account found",201);
    res.status(resMessage.status).json(resMessage);
  }));

  // GET SHORT FAMILY_ACOUNT BY ID
  router.get("/short/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
    const ans = await family_service.getFamilyAccountByIdShort(Number(req.params.id));
    const resMessage= responseFactory.createResponse(ans,"Account found",201);
    res.status(resMessage.status).json(resMessage);
  }));

    // CLOSE FAMILY_ACOUNT BY ID - only if account empty 
    router.patch("/close/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
        await family_service.closeFamilyAccount(Number(req.params.id));
        const resMessage= responseFactory.createResponse("","success closing family",201);
        res.status(resMessage.status).json(resMessage);
      }));

    // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
router.post("/add/:format",raw(validateUpdateAccounts),raw( async (req:Request, res:Response) => {
    const ans = await family_service.addIndividualsToFamilyAccount(req.body.account_id,req.body.owners,req.params.format);
    const resMessage= responseFactory.createResponse(ans,"success add inidividuals to family",201);
    res.status(resMessage.status).json(resMessage);
  }));

  // REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    router.put("/remove/:format",raw(validateUpdateAccounts),raw( async (req:Request, res:Response) => {
      const ans = await family_service.removeIndividualsFromFamilyAccount(req.body.account_id,req.body.owners,req.params.format);
      const resMessage= responseFactory.createResponse(ans,"remove add inidividuals from family",201);
      res.status(resMessage.status).json(resMessage);
    }));
   export default router;
  