/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import config from "../config.js";
const { INVALID_FILED_VALUE , MISSING_REQUIRED_FIELD }  = config
import { Request, Response, NextFunction } from "express";
import validation_func from "../utils/validationFunc.js";
import { IAccount, IBusiness, transferType } from "../types/types.js";
import utils from "../utils/validationService.js";
import logger from "../utils/logger.js";


class AccountValidation{
validateAccountMandatoryFields(currency: string, balance: number,agent_id:number): void {

    try {
        logger.params("validateAccountMandatoryFields", { currency, balance });
        if (currency === undefined) {
            throw new Error(`${MISSING_REQUIRED_FIELD} - please provide currency`)
        }
        if (balance === undefined) {
            throw new Error(`${MISSING_REQUIRED_FIELD} - please provide balance`)
        }
        if (balance < 0) {
            throw new Error(`${INVALID_FILED_VALUE} - balance cant be negative`)
        }
        if (agent_id === undefined) {
            throw new Error(`${MISSING_REQUIRED_FIELD} - must provide agent_id`)
        }
        logger.funcRet("validateAccountMandatoryFields", "void");
    } catch (error) {
        logger.error("validateAccountMandatoryFields", error as Error);
        throw error;
    }
}

 async  validateTransferModel(req: Request, res: Response, next: NextFunction): Promise<void> {
    let { source, destination, amount } = req.body;
    if (!(source && destination && amount)) {
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    validation_func.amountPositive(amount as number);
    next();
}

  validateTransferAccounts(source: IAccount, dest: IAccount, amount: number, limit: number,type:transferType, FX = false): void {
    utils.accountsActive([source, dest]);
    utils.accountsCurrency([source], dest.currency, FX);
    utils.allowTransfers([source], amount, limit);
    type === "B2B" ? 
    utils.checkLimitTransfer("B2B", amount, (source as IBusiness).company_id , (dest as IBusiness).company_id)
    : utils.checkLimitTransfer(type, amount);
}


 async  validateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    let { accounts, action } = req.body;
    if (!(accounts && action != undefined && accounts.length > 0)) {
        throw new Error(`${MISSING_REQUIRED_FIELD}`);
    }
    const allNumber: boolean = accounts.every((acc: any) => (typeof acc === "number"));
    if (!allNumber) {
        throw new Error(`${INVALID_FILED_VALUE}- not all accounts are type number`)
    }
    next();
}

validateStatusAccounts(accounts: IAccount[], action: boolean): void {
    try {
        logger.params("validateStatusAccounts", { accounts, action });

        utils.accountsTypes(accounts, ["individual", "business"]);
        utils.checkProperState(accounts, !action);
        logger.funcRet("validateStatusAccounts", "void");
    } catch (error) {
        logger.error("validateStatusAccounts", error as Error);
        throw error;
    }
}

}

const accountValidation = new AccountValidation();
export default accountValidation