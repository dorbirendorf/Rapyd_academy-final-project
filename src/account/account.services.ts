/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { KeyObject } from "crypto";
import { ITransfer } from "../types/types.js";
import logger from "../utils/logger.js";
import { getRate } from "../utils/utils.js";
import * as DB_ACCOUNT from "./account.db.js"
import { validateTransferAccountsB2B, validateTransferAccountsB2I, validateTransferAccountsF2B ,validateStatusAccounts} from "./account.validation.js";

   
   export async function transferB2B(payload:ITransfer):Promise<string>{
      try {let {source,destination,amount} = payload;
       //let sourceTransfer = await DB_BUSINESS.getAccountsById(source);
      // let destTransfer = await DB_BUSINESS.getAccountsById(destination);
      let sourceTransfer = {account_id:1, currency:"USD", balance:100000000,agent_id:1, status:true, type:"business",company_id:3,
      company_name:"SF"};
      let destTransfer = {account_id:2, currency:"USD", balance:100000,agent_id:1, status:true, type:"business",company_id:3,
      company_name:"SF"};
      validateTransferAccountsB2B(sourceTransfer,destTransfer,amount);
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency,destTransfer.currency, destTransfer.balance,amount);
      return ans;} catch (error) {
         logger.error("transferB2B", error as Error);
        throw error;
    }
     }

     export async function transferB2BFX(payload:ITransfer):Promise<string>{
      try{let {source,destination,amount} = payload;
       //let sourceTransfer = await DB_BUSINESS.getAccountsById(source);
      // let destTransfer = await DB_BUSINESS.getAccountsById(destination);
      let sourceTransfer = {account_id:1, currency:"ILS", balance:100000000,agent_id:1,  status:true, type:"business",company_id:4,
      company_name:"SF"};
      let destTransfer = {account_id:2, currency:"EUR", balance:100000,agent_id:1,  status:true, type:"business",company_id:4,
      company_name:"SF"};  
      const FX = await getRate(destTransfer.currency,sourceTransfer.currency);
      const amountFX = FX*amount;  
      validateTransferAccountsB2B(sourceTransfer,destTransfer,amountFX,true);
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency,destTransfer.currency, destTransfer.balance,amount,FX);
      return await ans;}catch (error) {
         logger.error("transferB2BFX", error as Error);
        throw error;
    }
     }

     export async function transferB2I(payload:ITransfer):Promise<string>{
        try{let {source,destination,amount} = payload;
       //let sourceTransfer = await DB_BUSINESS.getAccountsById(source);
      // let destTransfer = await DB_INDIVIDUAL.getAccountsById(destination);
      let sourceTransfer = {account_id:1, currency:"USD", balance:100000,agent_id:1,  status:true, type:"business",company_id:4,
      company_name:"SF"};
      let destTransfer = {account_id:2, currency:"USD", balance:100000,agent_id:1,  status:true, type:"individual", individual_id:6,first_name:"string",last_name:"string"};
      validateTransferAccountsB2I(sourceTransfer,destTransfer,amount);
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency,destTransfer.currency, destTransfer.balance,amount);
      return ans;}catch (error) {
         logger.error("transferB2BFX", error as Error);
        throw error;
    }
     }

     export async function transferF2B(payload:ITransfer):Promise<string>{
      try{let {source,destination,amount} = payload;
       //let sourceTransfer = await DB_BUSINESS.getAccountsById(source);
      // let destTransfer = await DB_INDIVIDUAL.getAccountsById(destination);
      let sourceTransfer = {account_id:1, currency:"USD", balance:100000,agent_id:1,  status:true, type:"family"};
      let destTransfer = {account_id:1, currency:"USD", balance:1000888800,agent_id:1,  status:true, type:"business",company_id:4,
      company_name:"SF"};
      validateTransferAccountsF2B(sourceTransfer,destTransfer,amount);
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency,destTransfer.currency, destTransfer.balance,amount);
      return ans;}catch (error) {
         logger.error("transferB2BFX", error as Error);
        throw error;
    }
     }

   //   export async function getSecretKeyByAccessKey(accessKey):Promise<KeyObject>{
   //      console.log(accessKey);
   //      throw new Error("not implemeted yet")
   //   }

  
     export async function exectueTransfer(srcId:number, srcBalance:number, destId:number, srcCurr:string, destCurr:string, destBalance:number,amount:number,FX=1):Promise<string>{
      try{srcBalance= srcBalance - amount*FX;
      destBalance = destBalance + amount;
      //await DB_ACCOUNT.updateAccountBalance([[srcId,srcBalance],[destId,destBalance]]);
      return `source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}`;}catch (error) {
         logger.error("transferB2BFX", error as Error);
        throw error;
    }
   }

   export async function updateAccountStatus(accountsId:number[], action:boolean):Promise<string>{
      try{//let accounts:IAccount[] = await DB_ACCOUNT.getAccountsById(accountsId);
      let accounts = [{account_id:1, currency:"USD", balance:100000,agent_id:1,  status:false, type:"individual"}];
      //if some of the accounts not exists throw error
      validateStatusAccounts(accounts,accountsId,action);
      //add function that update all list of statuses
      await DB_ACCOUNT.updateAccountsStatus(accountsId,action);
      return `acounts: ${accountsId} changed to status ${action}`;}catch (error) {
         logger.error("transferB2BFX", error as Error);
        throw error;
    }
     }

     export async function getSecretKeyByAccessKey(access_key:string){
        try{ logger.params("getSecretKeyByAccessKey",{access_key})
            const secret_key =  DB_ACCOUNT.getSecretKeyByAccessKey(access_key);
        logger.funcRet("getSecretKeyByAccessKey",secret_key);   
        return
         
         }catch (error) {
         logger.error("getSecretKeyByAccessKey", error as Error);
        throw error;
    }
     }
