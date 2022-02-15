import { Request, Response, NextFunction } from "express";
import account_validation from "../account/account.validation.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import { IBusinessFromReq } from "../types/types.d.js";
import config from "../config.js";
import logger from "../utils/logger.js";
import validation_func from "../utils/validationFunc.js";
import errorFactory from "../exceptions/errorFactoryClass.js";
class BusinessValidator {
    validateBusinessModel = (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        try {
            const {
                company_id,
                company_name,
                context = null,
                currency,
                account_id,
                address = null,
                balance = 0,
                agent_id,
            } = req.body;
            account_validation.validateAccountMandatoryFields(
                currency as string,
                balance as number,
                agent_id as number
            );

            if (!(company_id && company_name)) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    ""
                );
            }
            if (account_id !== undefined) {
                throw new InformativeError(
                    String(config.errors.INVALID_FILED),
                    `account_id must not be provided!`
                );
            }
            validation_func.validEntityId(
                Number(config.constants.COMPANY_ID_LENGTH),
                company_id as number
            );

            const account: Partial<IBusinessFromReq> = {
                company_id,
                company_name,
                currency,
                context,
                address,
                balance,
                status: true,
                agent_id,
            };
            req.accounts = [account];
            next();
        } catch (error) {
            logger.error("validateBusinessModel", error as Error);
            next(errorFactory.createError(error as InformativeError));
        }
    };
}

const validator = new BusinessValidator();
export default validator;
