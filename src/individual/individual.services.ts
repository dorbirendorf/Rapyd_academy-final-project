/* eslint-disable @typescript-eslint/no-unsafe-return */
// import { INVALID_FILED_VALUE } from "../types/constants.js";
import * as DB_INDIVIDUAL from "./individual.db.js"
import { IIndividual} from "../types/types.js";
import { INVALID_FILED_VALUE } from "../types/constants.js";

  export async function createIndividualAccount(individual:Partial<IIndividual>):Promise<any>{
    await getIndividualByIndividualId(individual.individual_id as number);
    return await DB_INDIVIDUAL.createIndividualAccount(individual);
   }
    export async function getIndividualByAccountId(accountId:string):Promise<IIndividual>{
      return (await DB_INDIVIDUAL.getAllIndividualsAccountsById([Number(accountId)]))[0];
   }

   export async function getIndividualByIndividualId(individualId:number):Promise<any>{
    let individual =  await DB_INDIVIDUAL.checkIfIndivdualExistByIndividualId(individualId);
    if(individual){
      throw new Error(`${INVALID_FILED_VALUE}- individual id already exist`);
    }
    return false;
   }




  