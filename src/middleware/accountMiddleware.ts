import { RequestHandler } from "express";
import { Account } from "../account/account.interface.js";

const isASctivate: RequestHandler = (req,res,next) => {
  const accounts:Account[] = req.accounts;
  const allActive:boolean = accounts.every(acc=>acc.status === "Active");
  if (allActive)
  {next()}
  else{
    throw new Error("Invalid field - msg.. ")
  }
}

//   async function getRate(base:string, currency:string) {
//     try{

//       const base_url = `http://api.exchangeratesapi.io/latest`;
//       const url = `${base_url}?base=${base}&symbols=${currency}&access_key=9acb60fcfa9f9cc2569783ac6219ef2f`;
  
//       const res = await fetch(url);
//       const json = await res.json();

//       if (json.rates[currency]) return json.rates[currency];
//       else throw new Error(`currency: ${currency} doesn't exist in results.`); //app logic error
   
//     }catch(error){
//       console.log("Error getting currency value", error);
//       throw error;
//     }

// }