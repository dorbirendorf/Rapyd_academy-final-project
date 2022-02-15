import {
    IAccount,
    IIndividual,
    IFamily,
    transferTypeWithLimitation,
} from "../types/types.js";
import config from "../config.js";
import logger from "./logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";

class ValidationService {
    accountsExist(accounts: IAccount[], tuples: [number, number][]): boolean {
        try {
            logger.params("accountsExist", { accounts, tuples });

            if (tuples.length !== accounts.length) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    ` not all accounts are exsits`
                );
            }
            logger.funcRet("accountsExist", true);

            return true;
        } catch (err) {
            logger.error("accountsExist", err as Error);
            throw err;
        }
    }
    accountsActive(accounts: IAccount[]): boolean {
        try {
            logger.params("accountsActive", { accounts });
            const allActive: boolean = accounts.every(
                (acc) => acc.status === "active"
            );
            if (!allActive) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    ` not all accounts are active`
                );
            }
            logger.funcRet("accountsActive", true);

            return true;
        } catch (err) {
            logger.error("accountsActive", err as Error);
            throw err;
        }
    }
    checkProperState(
        accounts: IAccount[],
        action: "active" | "inactive"
    ): boolean {
        try {
            logger.params("checkProperState", { accounts, action });
            const allStatusProper: boolean = accounts.every(
                (acc) => acc.status == action
            );
            if (!allStatusProper) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    ` not all accounts ${action}`
                );
            }
            logger.funcRet("checkProperState", true);

            return true;
        } catch (err) {
            logger.error("checkProperState", err as Error);
            throw err;
        }
    }

    accountsTypes(accounts: IAccount[], type: string[]): boolean {
        try {
            logger.params("accountsTypes", { accounts, type });

            const allAccepttype: boolean = accounts.every(
                (acc) => acc.type === type[0] || acc.type === type[1]
            );
            if (!allAccepttype) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    `not all accounts are the type ${type[0]} or ${type[1]} `
                );
            }
            logger.funcRet("accountsTypes", true);

            return true;
        } catch (err) {
            logger.error("accountsTypes", err as Error);
            throw err;
        }
    }
    accountsCurrency(
        accounts: IAccount[],
        currency: string,
        FX = false
    ): boolean {
        try {
            logger.params("accountsCurrency", { accounts, currency, FX });

            if (FX) return true;
            const allCurrency: boolean = accounts.every(
                (acc) => acc.currency.toLowerCase() === currency.toLowerCase()
            );
            if (!allCurrency) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    `not all accounts have same currency`
                );
            }
            logger.funcRet("accountsCurrency", true);

            return true;
        } catch (err) {
            logger.error("accountsCurrency", err as Error);
            throw err;
        }
    }
    accountsBelongToFamily(owners: IIndividual[], accounts: number[]): boolean {
        try {
            logger.params("accountsBelongToFamily", { owners, accounts });

            const check = accounts.every((id) =>
                owners.some((owner) => owner.account_id === id)
            );
            if (!check) {
                throw new InformativeError(
                    config.errors.INVALID_FILED_VALUE,
                    `not all account belong to this family...`
                );
            }

            logger.funcRet("accountsBelongToFamily", true);

            return true;
        } catch (err) {
            logger.error("accountsBelongToFamily", err as Error);
            throw err;
        }
    }

    allowTransfers(
        accounts: IAccount[],
        amount: number,
        minBalance: number
    ): boolean {
        try {
            logger.params("allowTransfers", { accounts, amount, minBalance });

            const allTransfers: boolean = accounts.every(
                (acc) => acc.balance - amount > minBalance
            );
            if (!allTransfers) {
                throw new InformativeError(
                    config.errors.ACCOUNT_BALLANCE_LOW,
                    ` not all accounts have enought balance`
                );
            }
            logger.funcRet("allowTransfers", true);

            return true;
        } catch (err) {
            logger.error("allowTransfers", err as Error);
            throw err;
        }
    }

    checkIndividualBelongToFamily(individual: IIndividual, family: IFamily) {
        try {
            logger.funcRet("checkIndividualBelongToFamily", {
                individual,
                family,
            });

            if (
                family.owners_id?.every(
                    (owner) => owner.account_id !== individual.account_id
                )
            ) {
                throw new InformativeError(
                    config.errors.TRANSFER_NOT_ALLOW,
                    "The account doesn't belong to this family account"
                );
            }
            logger.funcRet("checkIndividualBelongToFamily", "void");
        } catch (error) {
            logger.error("checkIndividualBelongToFamily", error as Error);
            throw error;
        }
    }

    checkLimitTransfer(
        type: transferTypeWithLimitation,
        amount: number,
        sourceId?: number,
        destId?: number
    ): boolean {
        try {
            logger.params("checkLimitTransfer", {
                type,
                amount,
                sourceId,
                destId,
            });

            if (!config.flags[type]) {
                logger.funcRet("checkLimitTransfer-flag is off", true);
                return true;
            }

            const max_tranfare = {
                F2B: config.constants.TRANSFER_LIMIT_F2B,
                B2I: config.constants.TRANSFER_LIMIT_B2I,
                B2B: {
                    SC: config.constants.TRANSFER_LIMIT_B2BS,
                    DC: config.constants.TRANSFER_LIMIT_B2BD,
                },
            };
            let limitTransfer =
                type === "B2B"
                    ? sourceId === destId
                        ? max_tranfare[type].SC
                        : max_tranfare[type].DC
                    : max_tranfare[type];

            if (amount > limitTransfer) {
                throw new InformativeError(
                    config.errors.INVALID_AMOUNT_VALUE,
                    `transfer is limited to ${limitTransfer}`
                );
            }
            logger.funcRet("checkLimitTransfer", true);

            return true;
        } catch (err) {
            logger.error("checkLimitTransfer", err as Error);
            throw err;
        }
    }
}

const service = new ValidationService();
export default service;
