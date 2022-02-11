import { IBusiness } from "../types/types.js";
import logger from "../utils/logger.js";
import * as DB_BUSINESS from "./business.db.js"

  export async function createBusinessAccount(business:Partial<IBusiness>):Promise<any>{
    try{
      logger.params("createBusinessAccount",{business})
      const businessAccount = await DB_BUSINESS.createBusinessAccount(business);
      logger.funcRet("createBusinessAccount",businessAccount)
      return businessAccount;
    }catch(err){
      logger.error("createBusinessAccount",err as Error)
      throw err

    }
   }
   
   export async function getBusinessAccountById(accountId:string):Promise<any>{
    try{
      logger.params("getBusinessAccountById",{accountId})
      const business=await DB_BUSINESS.getBusinessAccountById(Number(accountId));
      logger.funcRet("getBusinessAccountById",{business})
      return business
    }catch(err){
      logger.error("createBusinessAccount",err as Error)
      throw err

    }
   }

