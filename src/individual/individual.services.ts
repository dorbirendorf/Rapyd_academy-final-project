// import { INVALID_FILED_VALUE } from "../types/constants.js";
import * as DB_INDIVIDUAL from "./individual.db.js"
import { IIndividual} from "../types/types.js";
import { INVALID_FILED_VALUE } from "../types/constants.js";

  export async function createIndividualAccount(individual:Partial<IIndividual>):Promise<any>{
    await getIndividualByIndividualId(individual.individual_id as number);
    return await DB_INDIVIDUAL.createIndividualAccount(individual);
   }
    export async function getIndividualByAccountId(accountId:string):Promise<IIndividual>{
      //meir :if not found - throw....
    return await DB_INDIVIDUAL.getIndividualByAccountId(Number(accountId));
   }

   export async function getIndividualByIndividualId(individualId:number):Promise<any>{
    let individual =  await DB_INDIVIDUAL.getIndividualByIndividualId(individualId);
    //meir : how response comeback? fix if.
    if(individual!=="null"){
      throw new Error(`${INVALID_FILED_VALUE}- individual id already exist`);
    }
   }




  