import express from "express";
import morgan from "morgan";
import log from "@ajar/marker";
import cors from "cors";
import { connectDb } from "./db/sql/sql.connection.js";
import individual_router from "./individual/individual.router.js";
// import cron from "node-cron";
// import {CONFIG} from './config.json';

import {
    error_handler,
    error_handler2,
    not_found,
    logError
} from "./middleware/errors.handler.js";
import {addIdToReq,logRequest} from "./middleware/user_func.js";

const {
    PORT = 3030,
    HOST = "localhost",
} = process.env;

class Api {
  
    private app: express.Application;

    constructor() {
        this.app = express();

        this.applyGlobalMiddleware();
        this.routing();
        this.errorHanlers();
    }

    applyGlobalMiddleware() {
        log.blue("setting Middlewares...");
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(addIdToReq);
        this.app.use(logRequest());
    }

    routing() {
        log.blue("setting routes...");
        this.app.use("/api/auth", individual_router);
    }

errorHanlers() {
    log.blue("setting error handlers...");
        // central error handling
        this.app.use(error_handler);
        this.app.use(logError);
        this.app.use(error_handler2);
        // when no routes were matched...
        this.app.use("*", not_found);
    }

    // start the express api server
    async startServer(){
        try {
            // connect to mySql
             await connectDb();
            await this.app.listen(Number(PORT), HOST);
            log.magenta(
                "api is live on",
                ` ✨ ⚡  http://${HOST}:${PORT} ✨ ⚡`
            );
        } catch (err) {
            console.log(err);
        }
    }
}

const api = new Api();
api.startServer();
