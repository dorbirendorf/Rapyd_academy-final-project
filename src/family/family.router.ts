/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
import { httpResponseMessage, IFamily } from "../types/types.js";
import { validateAccountId } from "../utils/validationFunc.js";
 import * as family_service from "./family.services.js";
 import { validateFamilyModel, validateUpdateAccounts } from "./family.validator.js"

const router = express.Router();



// CREATES A NEW FAMILY_ACOUNT
router.post("/",raw(validateFamilyModel),raw( async (req:Request, res:Response) => {
const ans = await family_service.createFamilyAccount(req.accounts[0] as Partial<IFamily>,req.body.owners,req.body.currency);
const resMessage : httpResponseMessage ={
  status: 201,
  message: "Account created",
  data: ans}; 
  res.status(201).json(resMessage);
  }));

  // GET FULL FAMILY_ACOUNT BY ID
router.get("/full/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
    const ans = await family_service.getFamilyAccountByIdFull(Number(req.params.id));
    res.status(200).json(ans);
  }));

  // GET SHORT FAMILY_ACOUNT BY ID
  router.get("/short/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
    console.log("enter Route")
    const ans = await family_service.getFamilyAccountByIdShort(Number(req.params.id));
    res.status(200).json(ans);
  }));

    // CLOSE FAMILY_ACOUNT BY ID - only if account empty 
    router.post("/close/:id",raw(validateAccountId),raw( async (req:Request, res:Response) => {
        const ans = await family_service.closeFamilyAccount(Number(req.params.id));
        res.status(200).json(ans);
      }));

    // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
router.put("/add/:fid",raw(validateUpdateAccounts),raw( async (req:Request, res:Response) => {
    let ans = await family_service.addIndividualsToFamilyAccount(Number(req.params.id),req.body.owners, req.body.format);
    res.status(200).json(ans);
  }));

    // REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID -  SOHRT/FULL
    router.put("/remove/:fid",raw(validateUpdateAccounts),raw( async (req:Request, res:Response) => {
    const ans = await family_service.removeIndividualsFromFamilyAccount(Number(req.params.id),req.body.owners, req.body.format);
      res.status(200).json(ans);
    }));
   export default router;
  