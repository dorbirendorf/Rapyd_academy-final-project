import {
    IIndividualFromDB,
    IIndividual,
    IFamily,
    IBusiness,
    IBusinessFromDb,
    IAccount,
    IFamilyFromDb,
    IAccountFromDb,
} from "../types/types.js";
import logger from "./logger.js";
class Parser {
    parseIndividualFromObj(obj: IIndividualFromDB): IIndividual {
        try {
            logger.params("parseIndividualFromObj", { obj });

            const {
                account_id,
                currency,
                balance,
                status,
                agent_id,
                type,
                individual_id,
                first_name,
                last_name,
                email,
                address_id,
                country_name,
                country_code,
                postal_code,
                city,
                region,
                street_name,
                street_number,
            } = obj;
            const statusString = status ? "active" : "inactive";

            const individual: IIndividual = {
                account_id,
                agent_id,
                currency,
                balance,
                status: statusString,
                type,
                individual_id,
                first_name,
                last_name,
                email,
            };
            individual.address = {
                address_id,
                country_name,
                country_code,
                postal_code,
                city,
                region,
                street_name,
                street_number,
            };
            logger.funcRet("parseIndividualFromObj", individual);

            return individual;
        } catch (error) {
            logger.error("parseIndividualFromObj", error as Error);
            throw error;
        }
    }
    parseFamilyFromObj(obj: IFamilyFromDb): IFamily {
        try {
            logger.params("parseFamilyFromObj", { obj });
            const {
                account_id,
                currency,
                balance,
                status,
                agent_id,
                type,
                context,
            } = obj;
            const statusString = status ? "active" : "inactive";

            const family: IFamily = {
                account_id,
                currency,
                balance,
                agent_id,
                status: statusString,
                type,
                context,
            };
            logger.funcRet("parseFamilyFromObj", family);
            return family;
        } catch (error) {
            logger.error("parseFamilyFromObj", error as Error);
            throw error;
        }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    ParseBusinessFromObj(obj: IBusinessFromDb): IBusiness {
        try {
            logger.params("ParseBusinessFromObj", { obj });
            const {
                account_id,
                currency,
                balance,
                agent_id,
                status,
                type,
                company_id,
                company_name,
                context,
                address_id,
                country_name,
                country_code,
                postal_code,
                city,
                region,
                street_name,
                street_number,
            } = obj;
            const statusString = status ? "active" : "inactive";

            const business: IBusiness = {
                account_id,
                currency,
                agent_id,
                balance,
                status: statusString,
                type,
                company_id,
                company_name,
                context,
            };
            business.address = {
                address_id,
                country_name,
                country_code,
                postal_code,
                city,
                region,
                street_name,
                street_number,
            };
            logger.funcRet("ParseBusinessFromObj", business);

            return business;
        } catch (error) {
            logger.error("ParseBusinessFromObj", error as Error);
            throw error;
        }
    }

    ParseAccountFromObj(obj: IAccountFromDb): IAccount {
        try {
            logger.params("ParseAccountFromObj", { obj });

            const { account_id, currency, balance, agent_id, status, type } =
                obj;
            const statusString = status ? "active" : "inactive";
            const account: IAccount = {
                account_id,
                currency,
                agent_id,
                balance,
                status: statusString,
                type,
            };
            logger.funcRet("ParseAccountFromObj", account);

            return account;
        } catch (error) {
            logger.error("ParseAccountFromObj", error as Error);
            throw error;
        }
    }
}
const parser = new Parser();
export default parser;
