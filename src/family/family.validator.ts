import { Request, Response, NextFunction } from "express";
import { IFamily, IIndividual } from "../types/types.js";
import config from "../config.js";
import account_validation from "../account/account.validation.js";
import validation_func from "../utils/validationFunc.js";
import validation_service from "../utils/validationService.js";
import utils from "../utils/utils.js";
import logger from "../utils/logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import errorFactory from "../exceptions/errorFactoryClass.js";
class FamilyValidator {
    validateFamilyModel(req: Request, res: Response, next: NextFunction): void {
        try {
            let {
                owners,
                currency,
                balance = 0,
                context = null,
                agent_id,
            } = req.body;
            if (!(owners && (owners as [number, number][]).length > 0)) {
                throw new InformativeError(
                    config.errors.MISSING_REQUIRED_FIELD,
                    `we must get list of owners`
                );
            }
            const tupelsValid: boolean = (owners as [number, number][]).every(
                (owner: [number, number]) =>
                    !isNaN(Number(owner[0])) &&
                    !isNaN(Number(owner[1])) &&
                    Number(owner[1]) > 0 &&
                    typeof owner[0] === "number" &&
                    typeof owner[1] === "number"
            );
            if (!tupelsValid) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    `not all tupels list are valid`
                );
            }
            account_validation.validateAccountMandatoryFields(
                currency as string,
                balance as number,
                agent_id as number
            );
            validation_func.sumFamilyAmounts(
                owners as [number, number][],
                config.constants.MIN_FAMILY_BALANCE
            );
            const account = {
                currency,
                balance,
                status: true,
                type: "family",
                context,
                owners_id: [],
                agent_id,
            };
            req.accounts = [account];
            next();
        } catch (error) {
            next(errorFactory.createError(error as InformativeError));
        }
    }

    validateAddToFamily(
        accounts: IIndividual[],
        owners: [number, number][],
        currency: string
    ): void {
        try {
            logger.params("validateAddToFamily", {
                accounts,
                owners,
                currency,
            });
            validation_service.accountsExist(accounts, owners);
            validation_service.accountsActive(accounts);
            validation_service.accountsCurrency(accounts, currency);
            accounts.map((account) => {
                const owner = owners.find(
                    (own) => own[0] == account.account_id
                );
                if (!owner) {
                    throw new InformativeError(
                        config.errors.ACCOUNT_NOT_EXIST,
                        `not all account exsits in individual table`
                    );
                }
                const amount = owner[1];
                validation_service.allowTransfers([account], amount, 1000);
                logger.funcRet("validateAddToFamily", "void");
            });
        } catch (error) {
            logger.error("validateAddToFamily", error as Error);
            throw error;
        }
    }
    validateRemoveFromFamily(
        accounts: IIndividual[],
        owners: [number, number][],
        family: IFamily
    ): void {
        try {
            logger.params("validateRemoveFromFamily", {
                accounts,
                owners,
                family,
            });
            validation_service.accountsExist(accounts, owners);
            const individualIds = utils.convertTupelsToArray(owners);
            validation_service.accountsBelongToFamily(
                family.owners as IIndividual[],
                individualIds
            );
            logger.funcRet("validateRemoveFromFamily", "void");
        } catch (error) {
            logger.error("validateRemoveFromFamily", error as Error);
            throw error;
        }
    }

    validateUpdateAccounts(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            let { owners, account_id } = req.body;
            if (account_id === "undefined" || typeof account_id !== "number") {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    `account id isnt accept`
                );
            }
            if (!(owners && (owners as [number, number][]).length > 0)) {
                throw new InformativeError(
                    config.errors.MISSING_REQUIRED_FIELD,
                    `we must get list of owners`
                );
            }
            const tupelsValid: boolean = (owners as [number, number][]).every(
                (owner: [number, number]) =>
                    !isNaN(Number(owner[0])) &&
                    !isNaN(Number(owner[1])) &&
                    Number(owner[1]) > 0 &&
                    typeof owner[0] === "number" &&
                    typeof owner[1] === "number"
            );
            if (!tupelsValid) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    ` not all tupels list are valid`
                );
            }
            next();
        } catch (error) {
            next(errorFactory.createError(error as InformativeError));
        }
    }
}

const validator = new FamilyValidator();
export default validator;
