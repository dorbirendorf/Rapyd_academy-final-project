/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */

import uuid from "uuid";
import fetch from "node-fetch";
import crypto,{ KeyObject } from "crypto";
//import buffer from "buffer"


export function generateID():string{
    // return Math.random().toString(32).slice(2);
    return uuid.v4();
}

export function getTimeString():string {
    const date = new Date();
    return `${date.toDateString()} ${date.toTimeString()}`;
}

export async function convertCurrency(base:string,target:string,amount:number):Promise<number>{
  
  const key='94da963bfdeec85c7f82de995466e3b6'
  const base_url = `http://api.exchangeratesapi.io/latest`;
  const url = `${base_url}?base=${base}&symbols=${target}&access_key=${key}`;
  
  const res = await fetch(url);
  const data:any = await res.json()
  const rate = data.rates[target]
  return (rate as number)*amount;
}

export  function createSignture(data:Object,secret:KeyObject,time?:number):string{
  
  // Convert Stringified json data to buffer  
  const dataBuff = Buffer.from( JSON.stringify({data,time}) );
  
  // Sign the data and returned signature
  const signature = crypto.sign(undefined, dataBuff , secret).toString('base64');

  return signature;
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
    

