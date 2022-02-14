import fs from "fs";
import path from "path";
import chokidar from "chokidar"
import { Config } from "./types/types.js";

    let config:Config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/config.json"), "utf-8"))

const watcher = chokidar.watch('src/config.json').on('ready', function() {
    console.log('Newly watched paths:', watcher.getWatched());
});

watcher.on('change',()=>
{
    let {errors,configurations,constants} = (JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/config.json"), "utf-8"))) as Config;
    config.errors=errors;
    config.configurations=configurations;
    config.constants=constants;

});


export default config;


