import fs from "fs";
import path from "path";

const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/config.json"), "utf-8"));

export default config;