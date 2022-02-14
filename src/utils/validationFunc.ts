/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../config.js"
const { ACCOUNT_BALLANCE_LOW, INVALID_FILED_VALUE, MISSING_REQUIRED_FIELD } =config;
import { Request, Response, NextFunction } from "express";
import logger from "./logger.js";

class ValidationFunctions
{

  validEntityId(id_length: number, id: number): void {
   try {
      logger.params("validEntityId",{id_length,id})

      if (String(id).length !== id_length) {
         throw new Error(`${INVALID_FILED_VALUE} -  id not valid`);
      }
      logger.funcRet("validEntityId","void")

   } catch (err) {
      logger.error("validEntityId", err as Error)
      throw err
   }
}

  checkBalance(minimalBalance: number, balance: number): void {
   try {
      logger.params("checkBalance", {minimalBalance,balance})

      if (balance < minimalBalance) {
         throw new Error(ACCOUNT_BALLANCE_LOW);
      }
      logger.funcRet("checkBalance", "void")

   } catch (err) {
      logger.error("checkBalance", err as Error)
      throw err
   }
}

  amountPositive(amount: number): void {
   try {
      logger.params("amountPositive", amount)

      if (typeof amount !== "number" || amount <= 0) {
         throw new Error(`${INVALID_FILED_VALUE} - msg.. `)
      }
      logger.funcRet("amountPositive", "void")
   } catch (err) {

      logger.error("amountPositive", err as Error)
      throw err
   }
}


  sumFamilyAmounts(tupels: [number, number][], minBalance: number,min = true): number {
   try {
      logger.params("sumFamilyAmounts", {tupels,minBalance})

      const sum: number = tupels.reduce((prev, tupel) => tupel[1] + prev, 0);
      if(min){
         if (sum < minBalance) {
            throw new Error(`${ACCOUNT_BALLANCE_LOW} - sum of all amounts should be ${minBalance}`)
         }
      } else {
         if (sum > minBalance) {
            throw new Error(`${ACCOUNT_BALLANCE_LOW} - sum of all amounts can't be more then ${minBalance}`)
         }
      }

      
      logger.funcRet("sumFamilyAmounts", sum)

      return sum;
   } catch (err) {
      logger.error("sumFamilyAmounts", err as Error)
      throw err
   }
}
  


  initRequiredParams(): Map<string, string[]> {
   try {
      logger.params("initRequiredParams",{})

      const requiredParams = new Map<string, string[]>();
      requiredParams.set('individual', ['individual_id', 'first_name', 'last_name', 'currency']);
      requiredParams.set('business', ['compay_id', 'company_name', 'currency']);
      requiredParams.set('family', ['owners', 'currency']);
      logger.funcRet("initRequiredParams", requiredParams)

      return requiredParams;
   } catch (err) {
      logger.error("initRequiredParams", err as Error)
      throw err
   }
}
 async  validateAccountId(req: Request, res: Response, next: NextFunction): Promise<void> {
   try {
      logger.params("validateAccountId",{})

      const { id } = req.params;

      if ((id === "undefined") || (isNaN(Number(id)))) {
         throw new Error(`${INVALID_FILED_VALUE} - id is not valid!`)
      }
      logger.funcRet("validateAccountId", "void")
      next()
   } catch (err) {
      logger.error("validateAccountId", err as Error)
      throw err
   }
}
}

const validation = new ValidationFunctions()
export default validation