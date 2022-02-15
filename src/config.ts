import fs from "fs";
import path from "path";
import chokidar from "chokidar"
import { Config } from "./types/types.js";
import logger from "./utils/logger.js";

let config:Config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/config.json"), "utf-8"))

const watcher = chokidar.watch('src/config.json').on('ready', function() {
logger.funcRet("config","config update");
});

watcher.on('change',()=>
{
    let {errors,configurations,constants,flags} = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/config.json"), "utf-8"));
    config.errors=errors;
    config.configurations=configurations;
    config.constants=constants;
    config.flags=flags

});

export default config;


