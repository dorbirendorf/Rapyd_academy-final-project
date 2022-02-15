import config from "../config.js";
import { Request, Response, NextFunction } from "express";
import validation_func from "../utils/validationFunc.js";
import {
    IAccount,
    IAccountFromReq,
    IBusiness,
    IIndividual,
    transferType,
} from "../types/types.js";
import utils from "../utils/validationService.js";
import logger from "../utils/logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import errorFactory from "../exceptions/errorFactoryClass.js";

class AccountValidation {
    validateAccountMandatoryFields(
        currency: string,
        balance: number,
        agent_id: number
    ): void {
        try {
            logger.params("validateAccountMandatoryFields", {
                currency,
                balance,
            });
            if (currency === undefined) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    `please provide currency`
                );
            }
            if (balance === undefined) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    `please provide balance`
                );
            }
            if (balance < 0) {
                throw new InformativeError(
                    String(config.errors.INVALID_FILED_VALUE),
                    `balance cant be negative`
                );
            }
            if (agent_id === undefined) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    `must provide agent_id`
                );
            }
            logger.funcRet("validateAccountMandatoryFields", "void");
        } catch (error) {
            logger.error("validateAccountMandatoryFields", error as Error);
            throw error;
        }
    }

    validateTransferModel(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        try {
            let { source, destination, amount } = req.body;
            if (!(source && destination && amount)) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    ""
                );
            }
            validation_func.amountPositive(amount as number);
            next();
        } catch (error) {
            next(errorFactory.createError(error as InformativeError));
        }
    }

    validateTransferAccounts(
        source: IAccount,
        dest: IAccount,
        amount: number,
        limit: number,
        type: transferType,
        FX = false
    ): void {
        utils.accountsActive([source, dest]);
        utils.accountsCurrency([source], dest.currency, FX);
        utils.allowTransfers([source], amount, limit);
        if (type === "I2F") {
            utils.checkIndividualBelongToFamily(source as IIndividual, dest);
        } else {
            type === "B2B"
                ? utils.checkLimitTransfer(
                      "B2B",
                      amount,
                      (source as IBusiness).company_id,
                      (dest as IBusiness).company_id
                  )
                : utils.checkLimitTransfer(type, amount);
        }
    }

    validateStatus(req: Request, res: Response, next: NextFunction): void {
        try {
            let { accounts, action } = req.body;
            if (
                !(
                    accounts &&
                    action !== undefined &&
                    (accounts as IAccountFromReq[]).length > 0
                )
            ) {
                throw new InformativeError(
                    String(config.errors.MISSING_REQUIRED_FIELD),
                    ""
                );
            }
            const allNumber: boolean = (accounts as IAccountFromReq[]).every(
                (acc: any) => typeof acc === "number"
            );
            if (!allNumber) {
                throw new InformativeError(
                    String(config.errors.INVALID_FILED_VALUE),
                    ` not all accounts are type number`
                );
            }
            if (action !== "active" && action !== "inactive") {
                throw new InformativeError(
                    String(config.errors.INVALID_FILED_VALUE),
                    `action field must be active or inactive`
                );
            }

            next();
        } catch (error) {
            next(errorFactory.createError(error as InformativeError));
        }
    }

    validateStatusAccounts(
        accounts: IAccount[],
        action: "active" | "inactive"
    ): void {
        try {
            logger.params("validateStatusAccounts", { accounts, action });

            utils.accountsTypes(accounts, ["individual", "business"]);
            const opposite = action === "active" ? "inactive" : "active";
            utils.checkProperState(accounts, opposite);
            logger.funcRet("validateStatusAccounts", "void");
        } catch (error) {
            logger.error("validateStatusAccounts", error as Error);
            throw error;
        }
    }
}

const accountValidation = new AccountValidation();
export default accountValidation;
