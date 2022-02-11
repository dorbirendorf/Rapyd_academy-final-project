import { getTimeString } from "./utils.js";
import fs from "fs"
class Logger {
    path;
    stream;
    constructor(path: string) {
        this.path = path;
        this.stream = fs.createWriteStream(path, { flags: 'a+' });
    }
    params(function_name: string, parameters: Object): void {
        let paramsText = ""
        let timeStamp = getTimeString();
        for (const [key, value] of Object.entries(parameters)) {
            paramsText += `${key}: ${value}: ${typeof value} \n`;
        }
        const logText = `FUNCTION EXECUTION\n${timeStamp}\nsteping into ${function_name} with parameters:\n${paramsText}\n\n`
        this.stream.write(logText);
    }
    error(function_name: string, error: Error): void {
        let errorText = `message: ${error.message}`
        let timeStamp = getTimeString();
        const logText = `ERROR\n ${timeStamp} \n${function_name}:\n${errorText}\n\n`
        this.stream.write(logText);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    funcRet(function_name:string,returnValue:any):void{
        let timeStamp = getTimeString();
        const returnObject = typeof returnValue ==="object" ? returnValue || {} :{returnValue};
        let returnValueString=""
        for (const [key, value] of Object.entries(returnObject as object)){
            returnValueString +=`${key}: ${value}: ${typeof value} \n`;
          }
        const logText = `FUNCTION RETURN\n${timeStamp}\nreturning from "${function_name}" with value:\n${returnValueString}\n\n`
        this.stream.write(logText);
    }
}
const logger = new Logger("./src/log/expend_loggger.log")
export default logger;













