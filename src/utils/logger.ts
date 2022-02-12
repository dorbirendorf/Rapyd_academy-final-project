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
        let paramsText = JSON.stringify(parameters,null,2);
        let timeStamp = getTimeString();
        
        const logText = `FUNCTION EXECUTION\n${timeStamp}\nsteping into "${function_name}" with parameters:\n${paramsText}\n\n`
        this.stream.write(logText);
    }
    error(function_name: string, error: Error): void {
        let errorText = `message: ${error.message}`
        let timeStamp = getTimeString();
        const logText = `ERROR\n ${timeStamp} \n"${function_name}":\n${errorText}\n\n`
        this.stream.write(logText);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    funcRet(function_name:string,returnValue:any):void{
        let timeStamp = getTimeString();
        let returnValueString=JSON.stringify(returnValue,null,2);
        
        const logText = `FUNCTION RETURN\n${timeStamp}\nreturning from "${function_name}" with value:\n${returnValueString}\n\n`
        this.stream.write(logText);
    }
}
const logger = new Logger("./src/log/expend_loggger.log")
export default logger;














