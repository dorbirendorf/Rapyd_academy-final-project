/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRow, selectRowById } from "../db.utils.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IIndividual, IIndividualFromDB } from "../types/types.js";
import {createAccount,createAddress} from "../account/account.db"

export async function createIndividualAccount(individual: IIndividual): Promise<number> {
   const account_id = await createAccount(individual,"individual");
   const address_id = await createAddress(individual.address);
  await createRow("individual", { account_id, individual_id: individual.individual_id, first_name: individual.first_name, last_name: individual.last_name, email: individual.email, address_id})
   return account_id;
}

// export async function getIndividualAccountById(accountId: number): Promise<IIndividual> {
//    const [rows] = await db.query(`SELECT * FROM individual JOIN account on individual.account_id = account.primary_id
//    JOIN address on address.address_id = individual.address_id WHERE individual.account_id = ?`, [accountId])
//    if(!((rows as RowDataPacket[])[0])){
//       throw new Error("Data not found")
//    }
//    const individual = extractIndividualFromObj((rows as RowDataPacket[])[0] as IIndividualFromDB)
//    return individual
// }

export async function getAllIndividualsAccountsById(payload: number[]): Promise<IIndividual[]> {
   const orString = payload.map(id => "account_id = " + id.toString()).join(" OR ")
   const [rows] = await db.query(`SELECT * FROM individual JOIN account on individual.account_id = account.primary_id
   JOIN address on address.address_id = individual.address_id WHERE ${orString}`)
   if(!((rows as RowDataPacket[])[0])){
      throw new Error("Data not found")
   }
   const individuals = ((rows as RowDataPacket[]) as IIndividualFromDB[]).map(extractIndividualFromObj)
   
   return individuals
}

export async function checkIfIndivdualExistByIndividualId(individual_id: number): Promise<boolean> {
   const rows = await selectRowById("individual",{individual_id});
   return rows.length > 0;
}

export function extractIndividualFromObj(obj: IIndividualFromDB): IIndividual {
   const { account_id, currency, balance, status,agent_id, type, individual_id, first_name, last_name, email,
      address_id, country_name, country_code, postal_code, city, region, street_name, street_number } = obj
   const individual: IIndividual = { account_id ,agent_id,currency, balance, status, type, individual_id, first_name, last_name, email };
   individual.address = { address_id, country_name, country_code, postal_code, city, region, street_name, street_number }
   return individual
}



