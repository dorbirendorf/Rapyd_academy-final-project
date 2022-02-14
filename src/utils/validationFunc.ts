
import config from "../config.js"
import { Request, Response, NextFunction } from "express";
import logger from "./logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import errorFactory from "../exceptions/errorFactoryClass.js";
class ValidationFunctions
{

  validEntityId(id_length: number, id: number): void {
   try {
      logger.params("validEntityId",{id_length,id})

      if (String(id).length !== id_length) {
         throw new InformativeError(config.errors.INVALID_FILED_VALUE,`id not valid`);
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
         throw new InformativeError(config.errors.ACCOUNT_BALLANCE_LOW);
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
         throw new InformativeError(config.errors.INVALID_FILED_VALUE,` msg.. `)
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
            throw new InformativeError(config.errors.ACCOUNT_BALLANCE_LOW,`sum of all amounts should be ${minBalance}`)
         }
      } else {
         if (sum > minBalance) {
            throw new InformativeError(config.errors.ACCOUNT_BALLANCE_LOW,` sum of all amounts can't be more then ${minBalance}`)
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
 validateAccountId(req: Request, res: Response, next: NextFunction): void {
   try {
      logger.params("validateAccountId",{})

      const { id } = req.params;

      if ((id === "undefined") || (isNaN(Number(id)))) {
         throw new InformativeError(config.errors.INVALID_FILED_VALUE,` id is not valid!`)
      }
      logger.funcRet("validateAccountId", "void")
      next()
   } catch (error) {
      logger.error("validateAccountId", error as Error)
      next(errorFactory.createError(error as InformativeError))
   }
}
}

const validation = new ValidationFunctions()
export default validation