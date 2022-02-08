/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Response, Request } from "express";
import raw from "../middleware/route.async.wrapper.js";
import { validateTransferModel } from "./account.validation.js";
 import * as account_service from "./account.services.js"
import { httpResponseMessage } from "../types/types.js";

 const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// //ACTIVATE/DEACTIVATE ACCOUNT
// router.post("/",raw( async (req:Request, res:Response) => {
//     const ans = await account_service.updateAccountStatus(req.body);
//     res.status(200).json(ans);
//   }));

  //TRANSFER ACCOUNT B2B
router.post("/transfer/b2b",raw(validateTransferModel),raw( async (req:Request, res:Response) => {
  let ans = await account_service.transferB2B(req.body);
  const resMessage : httpResponseMessage ={
    status: 201,
    message: "transfer comleted",
    data: ans
  }; 
    res.status(201).json(resMessage);
}));



  // //TRANSFER ACCOUNT B2I
  // router.post("/transfer/b2i",raw( async (req:Request, res:Response) => {
  //   const ans = await account_service.transferB2I(req.body);
  //   res.status(200).json(ans);
  // }));

  //  //TRANSFER ACCOUNT F2B
  //  router.post("/transfer/f2b",raw( async (req:Request, res:Response) => {
  //   const ans = await account_service.transferF2B(req.body);
  //   res.status(200).json(ans);
  // }));

  //   //TRANSFER ACCOUNT B2BFX
  //   router.post("/transfer/b2bfx",raw( async (req:Request, res:Response) => {
  //     const ans = await account_service.transferB2BFX(req.body);
  //     res.status(200).json(ans);
  //   }));
  export default router;
  
