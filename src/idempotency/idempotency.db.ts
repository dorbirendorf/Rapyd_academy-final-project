import DbHandler from "../utils/db.utils.js";
import { RowDataPacket } from "mysql2";
import { db } from "../db/sql/sql.connection.js";
import { httpResponseMessage } from "../types/types.js";
import logger from "../utils/logger.js";

class IdempotencyDb {
    async createInstanceOfResponse(
        message: httpResponseMessage,
        idempotency_key: string,
        agent_id: number
    ): Promise<void> {
        try {
            logger.params("createIdempotencyResponseAccount", {
                message,
                idempotency_key,
                agent_id,
            });
            await DbHandler.createMultipleRows("idempotency", [
                {
                    message: message.message,
                    data: JSON.stringify(message.data),
                    status: message.status,
                    agent_id,
                    idempotency_key,
                },
            ]);
            logger.funcRet("createIdempotencyResponseAccount", "void");
        } catch (error) {
            logger.error("createIdempotencyResponseAccount", error as Error);
            throw error;
        }
    }

    async getResponseFromDb(
        agentId: number,
        requestKey: string
    ): Promise<httpResponseMessage | undefined> {
        try {
            logger.params("getResponseFromDb", { agentId, requestKey });

            const [rows] = (await db.query(
                `SELECT status,message,data FROM idempotency WHERE agent_id = ${agentId} AND idempotency_key = "${requestKey}"`
            )) as RowDataPacket[][];
            if (!rows[0]) {
                logger.funcRet("getResponseFromDb", undefined);

                return undefined;
            }
            let message: httpResponseMessage = rows[0] as httpResponseMessage;
            message.data = JSON.parse(String(message.data));
            logger.funcRet("getResponseFromDb", message);
            return message;
        } catch (error) {
            logger.error("getResponseFromDb", error as Error);
            throw error;
        }
    }
}

const idempotency_Db = new IdempotencyDb();
export default idempotency_Db;
