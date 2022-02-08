/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Individual } from "./individual.interface.js";
import { createRow, selectRowByIdWithJoin} from "../db.utils.js";
import { OkPacket , RowDataPacket} from "mysql2";
import {addAddressToAccount} from "../business/business.db.js"
import { db } from "../db/sql/sql.connection.js";

export async function createIndividualAccount(individual:Individual):Promise<number>{
   const accountRes = await createRow("account",{currency:individual.currency,balance:individual.balance,status:true, type: "individual"})
   await createRow("individual",{account_id:(accountRes as OkPacket).insertId,individual_id:individual.individual_id,first_name:individual.first_name,last_name:individual.last_name,email:individual.email,address_id:individual.address_id})
   return (accountRes as OkPacket).insertId;
}

   export async function getIndividualAccountById(individualId:string):Promise<Individual>{
      const accountRes = await selectRowByIdWithJoin("account","individual",{primary_id:individualId},"primary_id","account_id")
      const businessRes = await addAddressToAccount((accountRes as RowDataPacket[])[0] as Individual)
      return businessRes as Individual;
   }

   export async function getAllIndividualsAccountsById(payload:[number,number][]):Promise<Individual[]>{
      const orString = payload.map(pair => "individual_id = " + pair[0].toString()).join(" OR ")
      const accountRes = await db.query(`SELECT * FROM accounts JOIN individual ON accounts.primary_id = individual.account_id WHERE ${orString}`)
      return (accountRes as RowDataPacket[]) as Individual[];
   }



