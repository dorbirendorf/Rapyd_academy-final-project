/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
import { IFamily } from "../types/types.js";
 import * as family_service from "./family.services.js";
import { validateFamilyModel } from "./family.validator.js";

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW FAMILY_ACOUNT
router.post("/",validateFamilyModel,validateFamilyModel,raw( async (req:Request, res:Response) => {
    const ans = await family_service.createFamilyAccount(req.accounts[0] as Partial<IFamily>,req.body.owners,req.body.currency);
    res.status(200).json(ans);
  }));

  // GET FULL FAMILY_ACOUNT BY ID
router.get("/full/:id",raw( async (req:Request, res:Response) => {
    const ans = await family_service.getFamilyAccountByIdFull(req.params.id);
    res.status(200).json(ans);
  }));

  // GET SHORT FAMILY_ACOUNT BY ID
  router.get("/short/:id",raw( async (req:Request, res:Response) => {
    const ans = await family_service.getFamilyAccountByIdShort(req.params.id);
    res.status(200).json(ans);
  }));

    // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID - short ans
router.put("/add/short/:fid",raw( async (req:Request, res:Response) => {
    const ans = await family_service.addIndividualsToFamilyAccountShort(req.params.id,req.body);
    res.status(200).json(ans);
  }));

  // ADD INDIVIDUALS TO FAMILY_ACOUNT BY ID - full ans
router.put("/add/full/:fid",raw( async (req:Request, res:Response) => {
  const ans = await family_service.addIndividualsToFamilyAccountFull(req.params.id,req.body);
  res.status(200).json(ans);
}));

// REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID - short ans
       router.put("/remove/short/:fid",raw( async (req:Request, res:Response) => {
        const ans = await family_service.removeIndividualsFromFamilyAccountShort(req.params.id,req.body);
        res.status(200).json(ans);
      }));

// REMOVE INDIVIDUALS TO FAMILY_ACOUNT BY ID - full ans
     router.put("/remove/full/:fid",raw( async (req:Request, res:Response) => {
      const ans = await family_service.removeIndividualsFromFamilyAccountFull(req.params.id,req.body);
      res.status(200).json(ans);
    }));
  
  // DELETE FAMILY_ACOUNT BY ID - only if account empty 
    router.delete("/close/:id",raw( async (req:Request, res:Response) => {
        const ans = await family_service.closeFamilyAccount(req.params.id);
        res.status(200).json(ans);
      }));
      
  export default router;
  