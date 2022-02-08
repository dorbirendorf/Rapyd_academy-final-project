import { IBusiness } from "../types/types.js";
import * as DB_BUSINESS from "./business.db.js"

  export async function createBusinessAccount(business:IBusiness):Promise<any>{
    return await DB_BUSINESS.createBusinessAccount(business);
   }
   
   export async function getBusinessAccountById(businessId:string):Promise<any>{
    return await DB_BUSINESS.getBusinessAccountById(businessId);
   }

