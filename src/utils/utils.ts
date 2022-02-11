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
  return tupels.map((tupel: [number, number]) => tupel[0]); 
}

export function getTimeString():string {
    const date = new Date();
    return `${date.toDateString()} ${date.toTimeString()}`;
}

export async function getRate(base:string, currency:string):Promise<number>{
     try{
       const base_url = `http://api.exchangeratesapi.io/latest`;
       const url = `${base_url}?base=${base}&symbols=${currency}&access_key=a438c9db4a4d638eb38f78b27eb021d9`;
   
       const res = await fetch(url);
       const json = await res.json();
       if ((json as any).rates[currency]) return (json as any).rates[currency];
       else throw new Error(`currency: ${currency} doesn't exist in results.`);
    }catch(error){
      console.log(error)
       throw error;
     }
   }

export  function createsignature(data:Object,secret:string,time?:string):string {
  const payload = {data,time};
  const hash = Crypto.SHA256(JSON.stringify(payload), secret).toString();
  return hash
}


export function hasTimeout(timeStamp:number,timeOutLength:number):boolean{
  const now = Date.now();
  const MSdiff = now-timeStamp
  return  MSdiff>timeOutLength
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
    

