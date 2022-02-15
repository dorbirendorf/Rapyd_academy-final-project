import { ITransfer, IAccount, IAgentKey } from "../types/types.js";
import logger from "../utils/logger.js";
import utils from "../utils/utils.js";
import DB_ACCOUNT from "./account.db.js";
import DB_BUSINESS from "../business/business.db.js";
import DB_INDIVIDUAL from "../individual/individual.db.js";

import DB_FAMILY from "../family/family.db.js";
import accountValidation from "./account.validation.js";
import { InformativeError } from "../exceptions/InformativeError.js";

class AccountService {
    async transferB2B(payload: ITransfer): Promise<string> {
        try {
            let { source, destination, amount } = payload;
            let sourceTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([source])
            )[0];
            let destTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([destination])
            )[0];
            if (!sourceTransfer || !destTransfer) {
                throw new InformativeError("Data not found", "");
            }
            accountValidation.validateTransferAccounts(
                sourceTransfer,
                destTransfer,
                amount,
                10000,
                "B2B"
            );
            let ans = this.exectueTransfer(
                sourceTransfer.account_id,
                sourceTransfer.balance,
                destTransfer.account_id,
                sourceTransfer.currency,
                destTransfer.currency,
                destTransfer.balance,
                amount
            );
            return ans;
        } catch (error) {
            logger.error("transferB2B", error as Error);
            throw error;
        }
    }

    async transferB2BFX(payload: ITransfer): Promise<string> {
        try {
            let { source, destination, amount } = payload;
            let sourceTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([source])
            )[0];
            let destTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([destination])
            )[0];
            if (!sourceTransfer || !destTransfer) {
                throw new InformativeError("Data not found", "");
            }
            const FX = await utils.getRate(
                destTransfer.currency,
                sourceTransfer.currency
            );
            accountValidation.validateTransferAccounts(
                sourceTransfer,
                destTransfer,
                amount,
                10000,
                "B2B",
                true
            );
            let ans = this.exectueTransfer(
                sourceTransfer.account_id,
                sourceTransfer.balance,
                destTransfer.account_id,
                sourceTransfer.currency,
                destTransfer.currency,
                destTransfer.balance,
                amount,
                FX
            );
            return await ans;
        } catch (error) {
            logger.error("transferB2BFX", error as Error);
            throw error;
        }
    }

    async transferB2I(payload: ITransfer): Promise<string> {
        try {
            let { source, destination, amount } = payload;
            let sourceTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([source])
            )[0];
            let destTransfer = (
                await DB_INDIVIDUAL.getAllIndividualsAccountsById([destination])
            )[0];
            if (!sourceTransfer || !destTransfer) {
                throw new InformativeError("Data not found", "");
            }
            accountValidation.validateTransferAccounts(
                sourceTransfer,
                destTransfer,
                amount,
                1000,
                "B2I"
            );
            let ans = this.exectueTransfer(
                sourceTransfer.account_id,
                sourceTransfer.balance,
                destTransfer.account_id,
                sourceTransfer.currency,
                destTransfer.currency,
                destTransfer.balance,
                amount
            );
            return ans;
        } catch (error) {
            logger.error("transferB2I", error as Error);
            throw error;
        }
    }

    async transferF2B(payload: ITransfer): Promise<string> {
        try {
            let { source, destination, amount } = payload;
            let sourceTransfer = await DB_FAMILY.getFamilyAccountByIdShort(
                source
            );
            let destTransfer = (
                await DB_BUSINESS.getAllBusinessAccountById([destination])
            )[0];
            if (!sourceTransfer || !destTransfer) {
                throw new InformativeError("Data not found", "");
            }
            accountValidation.validateTransferAccounts(
                sourceTransfer,
                destTransfer,
                amount,
                5000,
                "F2B"
            );
            let ans = this.exectueTransfer(
                sourceTransfer.account_id,
                sourceTransfer.balance,
                destTransfer.account_id,
                sourceTransfer.currency,
                destTransfer.currency,
                destTransfer.balance,
                amount
            );
            return ans;
        } catch (error) {
            logger.error("transferB2BFX", error as Error);
            throw error;
        }
    }

    async transferI2F(payload: ITransfer): Promise<string> {
        try {
            let { source, destination, amount } = payload;
            let sourceTransfer = (
                await DB_INDIVIDUAL.getAllIndividualsAccountsById([source])
            )[0];
            let destTransfer = await DB_FAMILY.getFamilyAccountByIdShort(
                destination
            );
            if (!sourceTransfer || !destTransfer) {
                throw new InformativeError("Data not found", "");
            }
            accountValidation.validateTransferAccounts(
                sourceTransfer,
                destTransfer,
                amount,
                1000,
                "I2F"
            );
            let ans = this.exectueTransfer(
                sourceTransfer.account_id,
                sourceTransfer.balance,
                destTransfer.account_id,
                sourceTransfer.currency,
                destTransfer.currency,
                destTransfer.balance,
                amount
            );
            return ans;
        } catch (error) {
            logger.error("transferB2BFX", error as Error);
            throw error;
        }
    }

    async exectueTransfer(
        srcId: number,
        srcBalance: number,
        destId: number,
        srcCurr: string,
        destCurr: string,
        destBalance: number,
        amount: number,
        FX = 1
    ): Promise<string> {
        try {
            srcBalance = srcBalance - amount * FX;
            destBalance = destBalance + amount;
            await DB_ACCOUNT.updateAccountsBalance([
                [srcId, srcBalance],
                [destId, destBalance],
            ]);
            return `source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}`;
        } catch (error) {
            logger.error("transferB2BFX", error as Error);
            throw error;
        }
    }

    async updateAccountStatus(
        accountsId: number[],
        action: "active" | "inactive"
    ): Promise<string> {
        try {
            let accounts: IAccount[] = await DB_ACCOUNT.getAccountsById(
                accountsId
            );
            accountValidation.validateStatusAccounts(accounts, action);
            const status = action === "active" ? true : false;
            await DB_ACCOUNT.updateAccountsStatus(accountsId, status);
            return `acounts: ${String(accountsId)} changed to status ${action}`;
        } catch (error) {
            logger.error("transferB2BFX", error as Error);
            throw error;
        }
    }

    async getSecretKeyByAccessKey(access_key: string): Promise<IAgentKey> {
        try {
            logger.params("getSecretKeyByAccessKey", { access_key });
            const agentIdAndSecretKey =
                await DB_ACCOUNT.getSecretKeyByAccessKey(access_key);

            logger.funcRet("getSecretKeyByAccessKey", agentIdAndSecretKey);
            return agentIdAndSecretKey;
        } catch (error) {
            logger.error("getSecretKeyByAccessKey", error as Error);
            throw error;
        }
    }
}

const accountService = new AccountService();
export default accountService;
