/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Individual, pIndividual } from "./individual.interface.js";
import { createRow, selectRowByIdWithJoin} from "../db.utils.js";
import { OkPacket } from "mysql2";
import {addAddressToAccount} from "../business/business.db.js"

export async function createIndividualAccount(individual:Individual):Promise<number>{
   const accountRes = await createRow("account",{currency:individual.currency,balance:individual.balance,status:true})
   const res =  await createRow("individual",{account_id:(accountRes as OkPacket).insertId,individual_id:individual.individual_id,first_name:individual.first_name,last_name:individual.last_name,email:individual.email,address_id:individual.address_id})
   if(res){}
   return (accountRes as OkPacket).insertId;
}

   export async function getIndividualAccountById(individualId:string):Promise<pIndividual>{
      const accountRes = await selectRowByIdWithJoin("account","individual",{primary_id:individualId},"primary_id","account_id");
      const businessRes = await addAddressToAccount(accountRes as pIndividual)
      return businessRes;
   }



