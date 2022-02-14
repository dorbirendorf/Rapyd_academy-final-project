/* eslint-disable @typescript-eslint/no-unsafe-return */
import DB_INDIVIDUAL from "./individual.db.js";
import { IIndividual } from "../types/types.js";
import config from "../config.js";
const { INVALID_FILED_VALUE } =config
import logger from "../utils/logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";

class IndividualService
{ async createIndividualAccount(
    individual: Partial<IIndividual>
): Promise<any> {
    try {
        logger.params("createIndividualAccount", { individual });
        await this.checkIfIndivdualExistByIndividualId(
            individual.individual_id as number
        );

        const res = await DB_INDIVIDUAL.createIndividualAccount(individual);
        logger.funcRet("createIndividualAccount", { res });
        return res;
    } catch (err) {
        logger.error("createIndividualAccount", err as Error);
        throw err;
    }
}

 async  getIndividualByAccountId(
    accountId: string
): Promise<IIndividual> {
    try {
        logger.params("getIndividualByAccountId", { accountId });
        console.log(config);
        const individual = (
            await DB_INDIVIDUAL.getAllIndividualsAccountsById([
                Number(accountId),
            ])
        )[0];

        if (!individual) {
            throw new InformativeError("Data not found")
        }

        logger.funcRet("getIndividualByAccountId", { individual });
        return individual;
    } catch (err) {
        logger.error("getIndividualByAccountId", err as Error);
        throw err;
    }
}

 async  checkIfIndivdualExistByIndividualId(
    individualId: number
): Promise<any> {
    logger.params("getIndividualByIndividualId", { individualId });
    let individual = await DB_INDIVIDUAL.checkIfIndivdualExistByIndividualId(
        individualId
    );
    if (individual) {
        throw new InformativeError(INVALID_FILED_VALUE,`individual id already exist`);
    }
}
}

const service = new IndividualService()
export default service;