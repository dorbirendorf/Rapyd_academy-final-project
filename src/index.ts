import express from "express";
import morgan from "morgan";
import log from "@ajar/marker";
import cors from "cors";
import { connect_db } from "./db/mongo/mongoose.connection.js";
import user_router from "./routers/user.router.js";
import song_router from "./routers/song.router.js";
import artist_router from "./routers/artist.router.js";
import playlist_router from "./routers/playlist.router.js";
import cron from "node-cron";


import {
    error_handler,
    error_handler2,
    not_found,
    logError
} from "./middleware/errors.handler.js";
import {addIdToReq,logRequest} from "./middleware/reqPreProccesing.js";
import { auth } from "./middleware/auth.js";
import { backupDB } from "./utils.js";

class App {
    DB_URI;
    HOST;
    PORT;
    app;
    constructor() {
        const { PORT, HOST, DB_URI ,DB_TYPE } = process.env;

        this.DB_URI = DB_URI;
        this.HOST = HOST || "localhost";
        this.PORT = PORT || 8080;
        this.app = express();

        this.setMiddlewares();
        this.setRoutes();
        this.setErrorHandlers();
        if(DB_TYPE==="mongo"){
            this.connectMongoDB();
        }
        //backup db
        //cron.schedule("* * * * *", ()=>backupDB());

    }

    setMiddlewares() {
        log.blue("setting Middlewares...");
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(addIdToReq);
        this.app.use(logRequest);
    }

    setRoutes() {
        log.blue("setting routes...");

        // this.app.use('/api/stories', story_router);
        this.app.use("/api/users", user_router);
        this.app.use("/api/songs", song_router);
        this.app.use("/api/artists", artist_router);
        this.app.use("/api/playlists", playlist_router);

    }

    setErrorHandlers() {
        log.blue("setting error handlers...");

        this.app.use("*", not_found);
        this.app.use(logError);
        this.app.use(error_handler);
        this.app.use(error_handler2);
        //when no routes were matched...
    }
    connectMongoDB(){
        connect_db(this.DB_URI as string);
    }

   


    async run() {
        try {
            await this.app.listen(Number(this.PORT), this.HOST);
            log.magenta(
                "api is live on",
                ` ✨ ⚡  http://${this.HOST}:${this.PORT} ✨ ⚡`
            );
        } catch (e) {
            console.log(e);
        }
    }
}

const myApp = new App();

myApp.run();
