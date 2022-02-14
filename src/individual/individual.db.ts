/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import DbHandler from "../utils/db.utils.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { IIndividual, IIndividualFromDB } from "../types/types.js";
import account_db from "../account/account.db.js";
import logger from "../utils/logger.js";
import parser from "../utils/parser.js";

class IndividualDb
{ async  createIndividualAccount(individual: Partial<IIndividual>): Promise<number> {
   try {
      logger.params("createIndividualAccount", { individual });
      const account_id = await account_db.createAccount(individual, "individual");
      const address_id = await account_db.createAddress(individual.address);
      await DbHandler.createMultipleRows("individual", [{ account_id, individual_id: individual.individual_id, first_name: individual.first_name, last_name: individual.last_name, email: individual.email, address_id }])
      logger.funcRet("createIndividualAccount", account_id);
      return account_id;
   } catch (error) {
      logger.error("createIndividualAccount", error as Error);
      throw error;
   }
}



 async  getAllIndividualsAccountsById(accounts_id: number[]): Promise<IIndividual[]> {
   try {
      logger.params("getAllIndividualsAccountsById", { accounts_id });
      const orString = accounts_id.map(id => "account_id = " + id.toString()).join(" OR ")
      const [rows] = (await db.query(`SELECT * FROM individual JOIN account on individual.account_id = account.primary_id
   LEFT JOIN address on address.address_id = individual.address_id WHERE ${orString}`)) as RowDataPacket[][]
      
      const individuals = (rows as IIndividualFromDB[]).map((account) => parser.parseIndividualFromObj(account))
      logger.funcRet("getAllIndividualsAccountsById", individuals);
      return individuals
   } catch (error) {
      logger.error("getAllIndividualsAccountsById", error as Error);
      throw error;
   }
}

 async checkIfIndivdualExistByIndividualId(individual_id: number): Promise<boolean> {

   try {
      logger.params("checkIfIndivdualExistByIndividualId", { individual_id });

      const rows = await DbHandler.selectRowById("individual", { individual_id });
      const exist = rows.length > 0;
      logger.funcRet("checkIfIndivdualExistByIndividualId", exist);

      return exist;
   } catch (error) {
      logger.error("checkIfIndivdualExistByIndividualId", error as Error);
      throw error;
   }
}
}

const individual_db = new IndividualDb()
export default individual_db;



