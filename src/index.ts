/* eslint-disable @typescript-eslint/unbound-method */

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import log from "@ajar/marker";
import cors from "cors";
import config from "./config.js";
import { connectDb } from "./db/sql/sql.connection.js";
import individual_router from "./individual/individual.router.js";
import account_router from "./account/account.router.js"
import family_router from "./family/family.router.js";
import business_router from "./business/business.router.js";
import error_handlers from "./middleware/errors.handler.js";
import user_func from "./middleware/user_func.js";
import auth from "./middleware/auth.js"
import idempotencyMiddleware from "./middleware/idempotency.js";
import raw from "./middleware/route.async.wrapper.js"
import logger from "./utils/logger.js";

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
        this.app.use(express.json());
        this.app.use(morgan("dev"));
        this.app.use(user_func.addIdToReq);
        this.app.use(user_func.logRequest());
        this.app.use(raw((req:Request,res:Response,next:NextFunction)=>(auth.auth(req,res,next))))
        this.app.use(idempotencyMiddleware.idempotency);
    }

    routing() {
        log.blue("setting routes...");
        this.app.use("/api/account", account_router.router);
        this.app.use("/api/individual",individual_router.router);
        this.app.use("/api/family", family_router.router);
        this.app.use("/api/business", business_router.router);
    }

errorHanlers() {
    log.blue("setting error handlers...");
        // central error handling
        
        this.app.use(error_handlers.logError);
        this.app.use(error_handlers.sendErrorMessage);
    }

    // start the express api server
    async startServer(){
        try {
             await connectDb();
            this.app.listen(Number(config.configurations.PORT), config.configurations.HOST );
            log.magenta(
                "api is live on",
                ` ✨ ⚡  http://${config.configurations.HOST}:${config.configurations.PORT} ✨ ⚡`
            );
        } catch (err) {
            logger.error("index",err as Error)
        }
    }
}

const api = new Api();

 api.startServer()
 .then(()=>{logger.params("index",{undefined})})
 .catch(err=>{logger.error("index",err as Error)})
