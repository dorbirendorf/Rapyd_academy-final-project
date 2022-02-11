/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
// import jwt from "jsonwebtoken";
import uuid from "uuid";
import fetch from "node-fetch";
  import Crypto from "crypto-js";
import logger from "./logger.js";



export function generateID():string{
    // return Math.random().toString(32).slice(2);
    return uuid.v4();
}

export function convertTupelsToArray(tupels:[number,number][]):number[]{
  
  logger.params("convertTupelsToArray",{tupels});
  const arr=tupels.map((tupel: [number, number]) => tupel[0]); 
  
  logger.funcRet("convertTupelsToArray",{arr});
  return arr
}

export function getTimeString():string {
    const date = new Date();
    return `${date.toDateString()} ${date.toTimeString()}`;
}

export async function getRate(base:string, currency:string):Promise<number>{
    logger.params("getRate",{base,currency})
     try{
       const base_url = `http://api.exchangeratesapi.io/latest`;
       const url = `${base_url}?base=${base}&symbols=${currency}&access_key=a438c9db4a4d638eb38f78b27eb021d9`;
   
       const res = await fetch(url);
       const json = await res.json();
       if ((json as any).rates[currency]){
         const rate = (json as any).rates[currency];
         logger.funcRet("getRate",rate);
        return rate
      }
      else {
        throw new Error(`currency: ${currency} doesn't exist in results.`);
      }
    }
    catch(error){
      logger.error("getRate",error as Error)
       throw error;
     }
   }

export  function createsignature(data:Object,secret:string,time?:string):string {
  try{
    logger.params("createsignature",{data,secret,time})
    const payload = {data,time};
    const hash = Crypto.SHA256(JSON.stringify(payload), secret).toString();
    logger.params("createsignature",{hash});
    return hash

  }catch(err){
    logger.error("createsignature",err as Error);
    throw err
  }
}


export function hasTimeout(timeStamp:number,timeOutLength:number):boolean{
  try{

    logger.params("hasTimeout",{timeStamp,timeOutLength});
    const now = Date.now();
    const MSdiff = now-timeStamp
    const timeout= MSdiff>timeOutLength
    logger.funcRet("hasTimeout",{timeout});
  
    return  timeout
  }catch(err){
    logger.error("hasTimeout",err as Error )
    throw err
  }
}
// export async function backupDB() {
//         console.log("backing up...");
//         const p = exec(
//             `docker exec mysql-db mysqldump -u root --password=qwerty ${DB_NAME} `
//         );
    
//         fetch("http://localhost:4040/backup", {
//             method: "POST",
//             body: p.stdout,
//         });
// }
    

