// import { INVALID_FILED_VALUE } from "../types/constants.js";
import * as DB_INDIVIDUAL from "./individual.db.js"
import {IIndividual} from "../types/types.js";

  export async function createIndividualAccount(individual:Partial<IIndividual>):Promise<any>{
    //db: There can be only one (individual account on our system) - getIndividualByIndividualId
    //if get more than one throw error
    //throw new Error(`${INVALID_FILED_VALUE}- not all accounts are the same type`);
    return await DB_INDIVIDUAL.createIndividualAccount(individual);
  
   }
   //check with meir about getIndividualByAccountId & getIndividualByIndividualId
   export async function getIndividualAccountById(accountId:number):Promise<any>{
    return await DB_INDIVIDUAL.getIndividualAccountById(accountId);
   }
   


  