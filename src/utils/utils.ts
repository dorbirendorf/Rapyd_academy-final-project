import uuid from "uuid";
import fetch from "node-fetch";
import Crypto from "crypto-js";
import logger from "./logger.js";
import { InformativeError } from "../exceptions/InformativeError.js";
import { IExchange } from "../types/types.js";

class Utils {
    generateID(): string {
        return uuid.v4();
    }

    convertTupelsToArray(tupels: [number, number][]): number[] {
        logger.params("convertTupelsToArray", { tupels });
        const arr = tupels.map((tupel: [number, number]) => Number(tupel[0]));
        logger.funcRet("convertTupelsToArray", { arr });
        return arr;
    }

    getTimeString(): string {
        const date = new Date();
        return `${date.toDateString()} ${date.toTimeString()}`;
    }

    async getRate(base: string, currency: string): Promise<number> {
        logger.params("getRate", { base, currency });
        try {
            const base_url = `http://api.exchangeratesapi.io/latest`;
            const url = `${base_url}?base=${base}&symbols=${currency}&access_key=a438c9db4a4d638eb38f78b27eb021d9`;

            const res = await fetch(url);
            const json = await res.json();
            if ((json as IExchange).rates[currency]) {
                const rate = (json as IExchange).rates[currency];
                logger.funcRet("getRate", rate);
                return rate;
            } else {
                throw new InformativeError(
                    `currency: ${currency} doesn't exist in results.`
                );
            }
        } catch (error) {
            logger.error("getRate", error as Error);
            throw error;
        }
    }

    createsignature(data: Object, secret: string, time?: string): string {
        try {
            logger.params("createsignature", { data, secret, time });
            const payload = { data, time };
            const hash = Crypto.SHA256(
                JSON.stringify(payload),
                secret
            ).toString();
            logger.funcRet("createsignature", { hash });
            return hash;
        } catch (err) {
            logger.error("createsignature", err as Error);
            throw err;
        }
    }

    hasTimeout(timeStamp: number, timeOutLength: number): boolean {
        try {
            logger.params("hasTimeout", { timeStamp, timeOutLength });
            const now = Date.now();
            const MSdiff = now - timeStamp;
            const timeout = MSdiff > timeOutLength;
            logger.funcRet("hasTimeout", { timeout });

            return timeout;
        } catch (err) {
            logger.error("hasTimeout", err as Error);
            throw err;
        }
    }
}

const utils = new Utils();
export default utils;
