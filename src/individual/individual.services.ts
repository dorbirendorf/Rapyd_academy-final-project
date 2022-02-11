/* eslint-disable @typescript-eslint/no-unsafe-return */
// import { INVALID_FILED_VALUE } from "../types/constants.js";
import * as DB_INDIVIDUAL from "./individual.db.js"
import { IIndividual} from "../types/types.js";
import { INVALID_FILED_VALUE } from "../types/constants.js";
import logger from "../utils/logger.js";

  export async function createIndividualAccount(individual:Partial<IIndividual>):Promise<any>{
    try{
      logger.params("createIndividualAccount",{individual});
      await getIndividualByIndividualId(individual.individual_id as number);
  
      const res = await DB_INDIVIDUAL.createIndividualAccount(individual);
      logger.funcRet("createIndividualAccount",{res});
      return res

    }catch(err){
      logger.error("createIndividualAccount",err as Error);
      throw err

    }

   }
    export async function getIndividualByAccountId(accountId:string):Promise<IIndividual>{
      try{
      logger.params("getIndividualByAccountId",{accountId});

        const individual= (await DB_INDIVIDUAL.getAllIndividualsAccountsById([Number(accountId)]))[0];
        
        logger.funcRet("getIndividualByAccountId",{individual});
        return individual 
      }catch(err){
        logger.error("getIndividualByAccountId",err as Error);
        throw err
      }
   }

   export async function getIndividualByIndividualId(individualId:number):Promise<any>{
     
    logger.params("getIndividualByIndividualId",{individualId});
    let individual =  await DB_INDIVIDUAL.checkIfIndivdualExistByIndividualId(individualId);
    if(individual){
      throw new Error(`${INVALID_FILED_VALUE}- individual id already exist`);
    }
   }




  