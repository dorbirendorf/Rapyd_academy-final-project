/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRow, selectRowById } from "../db.utils.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IIndividual, IIndividualFromDB } from "../types/types.js";
import { createAccount, createAddress } from "../account/account.db.js";
import logger from "../utils/logger.js";

export async function createIndividualAccount(individual: Partial<IIndividual>): Promise<number> {
   try {
      await logger.params("createIndividualAccount", { individual });
      const account_id = await createAccount(individual, "individual");
      const address_id = await createAddress(individual.address);
      await createRow("individual", { account_id, individual_id: individual.individual_id, first_name: individual.first_name, last_name: individual.last_name, email: individual.email, address_id })
      await logger.funcRet("createIndividualAccount", account_id);
      return account_id;
   } catch (error) {
      await logger.error("createIndividualAccount", error as Error);
      throw error;
   }
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

export async function getAllIndividualsAccountsById(accounts_id: number[]): Promise<IIndividual[]> {
   try {
      await logger.params("getAllIndividualsAccountsById", { accounts_id });
      const orString = accounts_id.map(id => "account_id = " + id.toString()).join(" OR ")
      console.log(orString);
      const [rows] = (await db.query(`SELECT * FROM individual JOIN account on individual.account_id = account.primary_id
   LEFT JOIN address on address.address_id = individual.address_id WHERE ${orString}`)) as RowDataPacket[][]

      if (!(rows[0]) || rows.length != accounts_id.length) {
         console.log(rows, "functionnn");
         throw new Error("Data not found")
      }
      const individuals = (rows as IIndividualFromDB[]).map(extractIndividualFromObj)
      await logger.funcRet("getAllIndividualsAccountsById", individuals);
      return individuals
   } catch (error) {
      await logger.error("getAllIndividualsAccountsById", error as Error);
      throw error;
   }
}

export async function checkIfIndivdualExistByIndividualId(individual_id: number): Promise<boolean> {
   await logger.params("checkIfIndivdualExistByIndividualId", { individual_id });

   try {
      const rows = await selectRowById("individual", { individual_id });
      const exist = rows.length > 0;
      await logger.funcRet("checkIfIndivdualExistByIndividualId", exist);

      return exist;
   } catch (error) {
      await logger.error("checkIfIndivdualExistByIndividualId", error as Error);
      throw error;
   }
}

export function extractIndividualFromObj(obj: IIndividualFromDB): IIndividual {
   try {
      logger.params("extractIndividualFromObj", { obj });

      const { account_id, currency, balance, status, agent_id, type, individual_id, first_name, last_name, email,
         address_id, country_name, country_code, postal_code, city, region, street_name, street_number } = obj
      const individual: IIndividual = { account_id, agent_id, currency, balance, status, type, individual_id, first_name, last_name, email };
      individual.address = { address_id, country_name, country_code, postal_code, city, region, street_name, street_number }
      logger.funcRet("extractIndividualFromObj", individual);

      return individual
   } catch (error) {
      logger.error("extractIndividualFromObj", error as Error);
      throw error;
   }
}



