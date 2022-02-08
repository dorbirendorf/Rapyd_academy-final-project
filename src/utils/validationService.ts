import { IAccount } from "../types/types.js";
import {ACCOUNT_BALLANCE_LOW, INVALID_FILED_VALUE, } from '../types/constants.js';
import { amountPositive } from "./validationFunc.js";

export function accountsExist(accounts:IAccount[],tuples:[number,number][]):boolean{
    if (tuples.length!==accounts.length){
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts are exsits`)
    }
    return true;
 }
export function accountsActive(accounts:IAccount[]):boolean{
    const allActive:boolean = accounts.every(acc=>acc.status === "Active");
    if (!allActive){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts are active`)
   }
    return true;
 }

 export function accountsType(accounts:IAccount[],type:string):boolean{
   const allSametype:boolean = accounts.every(acc=>acc.type === type);
   if (!allSametype){
     throw new Error(`${INVALID_FILED_VALUE}- not all accounts are the same type`)
  }
   return true;
}
  export function accountsCurrency(accounts:IAccount[],currency:string):boolean{
     const allCurrency:boolean = accounts.every(acc=>acc.currency === currency);
     if (!allCurrency){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts dont have same currency`)
   }
     return true;
  }

  //excepted to get accounts with amount.
  //minBalance we get when use func.
  export function checkAmountBalance(accounts:IAccount[],minBalance:number):boolean{
      const allCurrency:boolean = accounts.every(acc=>{
         amountPositive(acc.amount as number);
         acc.balance-(acc.amount as number)>minBalance
      });
      if (!allCurrency){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts dont have same currency`)
      }
   return true;
}
export function allowTransfers(accounts:IAccount[],amount : number,minBalance:number):boolean{
     const allTransfers:boolean = accounts.every(acc=>(acc.balance-amount>minBalance));
     if (!allTransfers){
      throw new Error(`${ACCOUNT_BALLANCE_LOW}- not all accounts have enought balance`)
   }
     return true;
}

//  //   async function getRate(base:string, currency:string) {
//  //     try{
 
//  //       const base_url = `http://api.exchangeratesapi.io/latest`;
//  //       const url = `${base_url}?base=${base}&symbols=${currency}&access_key=9acb60fcfa9f9cc2569783ac6219ef2f`;
   
//  //       const res = await fetch(url);
//  //       const json = await res.json();
 
//  //       if (json.rates[currency]) return json.rates[currency];
//  //       else throw new Error(`currency: ${currency} doesn't exist in results.`); //app logic error
    
//  //     }catch(error){
//  //       console.log("Error getting currency value", error);
//  //       throw error;
//  //     }
 