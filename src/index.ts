/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
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

// import cron from "node-cron";

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
        //this.app.use(raw(auth.auth))
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
        // when no routes were matched...
        //this.app.use("*", not_found);
    }

    // start the express api server
    async startServer(){
        try {
            // connect to mySql
             await connectDb();
            this.app.listen(Number(config.PORT), config.HOST as string);
            log.magenta(
                "api is live on",
                ` ✨ ⚡  http://${config.HOST}:${config.PORT} ✨ ⚡`
            );
        } catch (err) {
            console.log(err);
        }
    }
}

const api = new Api();

 api.startServer().then(()=>console.log("listning..."));
//  const pending = api.startServer();
//  console.log(pending)