import * as DB_INDIVIDUAL from "./individual.db.js"
import { Individual } from "./individual.interface.js";

  export async function createIndividualAccount(individual:Individual):Promise<any>{
    return await DB_INDIVIDUAL.createIndividualAccount(individual);
  
   }
   
   export async function getIndividualAccountById(individualId:string):Promise<any>{
    return await DB_INDIVIDUAL.getIndividualAccountById(individualId);
   }

  