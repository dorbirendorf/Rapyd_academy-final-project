/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import log from "@ajar/marker";
import {ErrorRequestHandler, RequestHandler} from "express";
import fs from "fs/promises";
import { getTimeString } from "../utils.js";

const { White, Reset, Red } = log.constants;
 const { NODE_ENV } = process.env;

const ERRLOGGERPATH = "./src/log/error.log";

export const error_handler: ErrorRequestHandler = (err, req, res, next) => {
    log.error(err);
    next(err);
};

// check it
export const logError: ErrorRequestHandler = (err, req, res, next) => {
    fs.writeFile(ERRLOGGERPATH,`${req.id} -- ${getTimeString()} \n --> ${err.stack}\n`,{flag: "a",});
    next(err);
};

export const error_handler2: ErrorRequestHandler = (err, req, res, next) => {
    if (NODE_ENV !== "production")res.status(500).json({ status: err.message, stack: err.stack });
    else res.status(500).json({ status: "internal server error..." });
};

export const not_found: RequestHandler = (req, res) => {
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({ status: `url: ${req.url} not found...` });
};
