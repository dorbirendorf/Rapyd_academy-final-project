import { IBusiness } from "../types/types.js";
import logger from "../utils/logger.js";
import  DB_BUSINESS from "./business.db.js"
class BusinessService {
    async createBusinessAccount(business: Partial<IBusiness>): Promise<any> {
      try {
        logger.params("createBusinessAccount", { business })
        const businessAccount = await DB_BUSINESS.createBusinessAccount(business);
        logger.funcRet("createBusinessAccount", businessAccount)
        return businessAccount;
      } catch (err) {
        logger.error("createBusinessAccount", err as Error)
        throw err

      }
    }

  async getBusinessAccountById(accountId: string): Promise<any> {
    try {
      logger.params("service-getBusinessAccountById", { accountId })
      const business = await DB_BUSINESS.getAllBusinessAccountById([Number(accountId)]);
      if (!business || business.length === 0) {
        throw new Error("Data not found")
      }
      logger.funcRet("getBusinessAccountById", { business })
      return business
    } catch (err) {
      logger.error("service-createBusinessAccount", err as Error)
      throw err

    }
  }

}

const service = new BusinessService()
export default service;