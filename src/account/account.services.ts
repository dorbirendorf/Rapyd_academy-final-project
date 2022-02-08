/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {IIndividual, ITransfer } from "../types/types.js";
import * as DB_ACCOUNT from "./account.db.js";
import { validateTransferAccountsB2B } from "./account.validation.js";

   // export async function updateAccountStatus(payload:any):Promise<void>{
   //  return await DB_ACCOUNT.updateAccountStatus(payload);
   // }
   export async function transferB2B(payload:ITransfer):Promise<string>{
      let {source,destination,amount} = payload;
       //let sourceTransfer = await DB_.getAccountsById(source);
      // let destTransfer = await DB_ACCOUNT.getAccountsById(destination);
      let sourceTransfer = {account_id:1, currency:"USD", balance:100000, status:true, type:"business"};
      let destTransfer = {account_id:2, currency:"USD", balance:100000, status:true, type:"business"};
      validateTransferAccountsB2B(sourceTransfer,destTransfer,amount);
      let sourceBalance = sourceTransfer.balance-amount;
      let destBalance = destTransfer.balance+amount;
      await DB_ACCOUNT.updateAccountBalance(sourceTransfer.account_id,sourceBalance);
      await DB_ACCOUNT.updateAccountBalance(destTransfer.account_id,destBalance);
      let ans = `source: ${sourceTransfer.account_id},balance: ${sourceBalance},currency: ${sourceTransfer.currency}, destination: ${destTransfer.account_id},balance: ${destBalance},currency: ${destTransfer.currency}`;
      return ans;
     }
   //   export async function transferB2I(payload:any):Promise<void>{
   //      return await DB_ACCOUNT.transferB2I(payload)
   //   }
   //   export async function transferF2B(payload:any):Promise<void>{
   //    return await DB_ACCOUNT.transferF2B(payload);
   //   }
   //   export async function transferB2BFX(payload:any):Promise<void>{
   //    return await DB_ACCOUNT.transferB2BFX(payload);
   //   }