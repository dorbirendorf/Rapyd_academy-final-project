import { RequestHandler } from "express";
import { Account } from "../account/account.interface.js";
import { Family } from "../family/family.interface.js";

const isActivate: RequestHandler = (req,res,next) => {
  const accounts:Account[] = req.accounts;
  const allActive:boolean = accounts.every(acc=>acc.status === "Active");
  if (allActive)
  {
      next()
    }
  else{
    throw new Error("Invalid field - msg.. ")
  }
}

export function accountIsActive(accounts:Account[]):boolean{
    //check db_account where account_id= each one of the list=> accounts;
    const allActive:boolean = accounts.every(acc=>acc.status === "Active");
    if (!allActive){
         throw new Error("Invalid field - msg.. ")
    }
    return true;
 }
 export function checkAccountCurrency(accounts:Account[],currency:string):boolean{
    //check db_account where account_id= each one of the list=> accounts;
    const allCurrency:boolean = accounts.every(acc=>acc.currency === currency);
    if (!allCurrency){
         throw new Error("Invalid field - msg.. ")
    }
    return true;
 }

 export function allowTransfers(accounts:Account[],tupels,balance:number):boolean{
    //check db_account where account_id= each one of the list=> accounts;
    // const allBalance:boolean = accounts.every(acc=>(acc.balance -  === "Active");
    // if (!allBalance){
    //      throw new Error("Invalid field - msg.. ")
    // }
    // return true;
 }
 //check
 export function allowTransfer(account:Account,amount:number,minBalance:number):boolean{
     if(account.balance=== undefined){
        throw new Error("Invalid field - msg.. ")
     }
         const sub:number =  account.balance - amount;
         if(sub<minBalance){
            throw new Error("Invalid field - msg.. ")
        }
     return true;
 }

 export function accountExist(accounts:[string,number][],account_id:number[]):boolean{
    //check db_account where account_id= each one of the list=> accounts;
    if (account_id.length!==accounts.length){
         throw new Error("Account does not exist - msg .. ")
    }
    return true;
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