/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IAccount, transferType } from "../types/types.js";
import {ACCOUNT_BALLANCE_LOW, INVALID_AMOUNT_VALUE, INVALID_FILED_VALUE, SOMTHING_WENT_WRONG } from '../types/constants.js';


export function accountsExist(accounts:IAccount[],tuples:[number,number][]):boolean{
    if (tuples.length!==accounts.length){
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts are exsits`)
    }
    return true;
 }
export function accountsActive(accounts:IAccount[]):boolean{
    const allActive:boolean = accounts.every(acc=>acc.status === true);
    if (!allActive){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts are active`)
   }
    return true;
 }
 export function checkProperState(accounts:IAccount[],action:boolean):boolean{
   const allStatusProper:boolean = accounts.every(acc=>acc.status === action);
   if (!allStatusProper){
     throw new Error(`${INVALID_FILED_VALUE}- not all accounts ${action}`)
  }
   return true;
}

 export function accountsTypes(accounts:IAccount[],type:string[]):boolean{
   const allAccepttype:boolean = accounts.every(acc=>(acc.type === type[0]||acc.type === type[1]));
   if (!allAccepttype){
     throw new Error(`${INVALID_FILED_VALUE}- not all accounts are the type ${type[0]} or ${type[1]} `)
  }
   return true;
}
  export function accountsCurrency(accounts:IAccount[],currency:string,FX=false):boolean{
     if(FX) return true;
     const allCurrency:boolean = accounts.every(acc=>acc.currency === currency);
     if (!allCurrency){
      throw new Error(`${INVALID_FILED_VALUE}- not all accounts dont have same currency`)
   }
     return true;
  }
  export function accountsBelongToFamily(owners:{ account_id: number }[],accounts:number[]):boolean{
     const check = owners.every(owner =>accounts.includes(owner.account_id));
      if(!check){
       throw new Error(`${SOMTHING_WENT_WRONG}- msg...`)
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
export function checkLimitTransfer(type:transferType,amount:number,sourceName?:string, destName?:string):boolean{
   const max_tranfare = {
      "F2B":5000,
      "B2I":1000,
      "B2B":{
          "SC":10000,
          "DC":1000
      }
   }
   let limitTransfer = (type==="B2B") ? 
   ((sourceName=== destName) ?max_tranfare[type].SC : max_tranfare[type].DC):
   max_tranfare[type];
  
   if(amount>limitTransfer){
      throw new Error(`${INVALID_AMOUNT_VALUE}- transfer is limited to ${limitTransfer}`);
   }
   return true;
}