import { sqlRes } from "../utils/db.utils.js";
import DbHandler from "../utils/db.utils.js";
import {
    IAccount,
    IAddress,
    IAccountFromDb,
    IAgentKey,
} from "../types/types.js";
import { RowDataPacket, OkPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import logger from "../utils/logger.js";
import parser from "../utils/parser.js";

class AccountDb {
    async updateAccountsStatus(
        primary_ids: number[],
        status: boolean
    ): Promise<sqlRes> {
        try {
            logger.params("updateAccountsStatus", { primary_ids, status });
            const idsArray = primary_ids.map((primary_id) => {
                return { primary_id };
            });
            const statusArray = primary_ids.map(() => {
                return { status };
            });
            const res = await DbHandler.updateMultipleRowsById(
                "account",
                statusArray,
                idsArray
            );
            logger.funcRet("updateAccountsStatus", res);
            return res;
        } catch (error) {
            logger.error("updateAccountsStatus", error as Error);
            throw error;
        }
    }

    async updateAccountsBalance(
        idsAndBalances: [number, number][]
    ): Promise<sqlRes> {
        try {
            logger.params("updateAccountsBalance", { idsAndBalances });
            const idsArray = idsAndBalances.map((pair) => {
                return { primary_id: pair[0] };
            });
            const balanceArray = idsAndBalances.map((pair) => {
                return { balance: pair[1] };
            });
            const res = await DbHandler.updateMultipleRowsById(
                "account",
                balanceArray,
                idsArray
            );
            logger.funcRet("updateAccountsBalance", res);
            return res;
        } catch (error) {
            logger.error("updateAccountsBalance", error as Error);
            throw error;
        }
    }

    async getAccountsById(accounts_id: number[]): Promise<IAccount[]> {
        try {
            logger.params("getAccountsById", { accounts_id });

            const orString = accounts_id
                .map((id) => "primary_id = " + id.toString())
                .join(" OR ");
            const [rows] =
                (await db.query(`SELECT primary_id, status, balance, type, currency
    FROM account WHERE ${orString}`)) as RowDataPacket[][];
            const accounts: IAccount[] = (rows as IAccountFromDb[]).map(
                (account) => parser.ParseAccountFromObj(account)
            );
            logger.funcRet("getAccountsById", accounts);

            return accounts;
        } catch (error) {
            logger.error("getAccountsById", error as Error);
            throw error;
        }
    }

    async createAccount(
        account: Partial<IAccount>,
        type: string
    ): Promise<number> {
        try {
            logger.params("createAccount", { account, type });
            const res = await DbHandler.createMultipleRows("account", [
                {
                    currency: account.currency,
                    agent_id: account.agent_id,
                    balance: account.balance,
                    status: true,
                    type,
                },
            ]);
            const id = (res as OkPacket).insertId;
            logger.funcRet("createAccount", id);

            return id;
        } catch (error) {
            logger.error("createAccount", error as Error);
            throw error;
        }
    }

    async createAddress(address?: IAddress | null): Promise<number | null> {
        try {
            logger.params("createAddress", { address });

            if (address) {
                const res = await DbHandler.createMultipleRows("address", [
                    address,
                ]);
                const id = (res as OkPacket).insertId;
                logger.funcRet("createAddress", id);
                return id;
            } else {
                logger.funcRet("createAddress", null);
                return null;
            }
        } catch (error) {
            logger.error("createAddress", error as Error);
            throw error;
        }
    }

    async getSecretKeyByAccessKey(access_key: string): Promise<IAgentKey> {
        try {
            logger.params("getSecretKeyByAccessKey", { access_key });

            const rows = await DbHandler.selectRowById("agent", { access_key });
            let agent_key = { secret: undefined, agent_id: undefined };
            if (rows[0]) {
                agent_key.secret = rows[0].secret;
                agent_key.agent_id = rows[0].agent_id;
            }
            logger.funcRet("getSecretKeyByAccessKey", agent_key);
            return agent_key;
        } catch (error) {
            logger.error("getSecretKeyByAccessKey", error as Error);
            throw error;
        }
    }
}

const account_db = new AccountDb();
export default account_db;
