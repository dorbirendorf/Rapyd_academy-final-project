/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { KeyObject } from "crypto";
import { ITransfer, IAccount } from "../types/types.js";
import logger from "../utils/logger.js";
import { getRate } from "../utils/utils.js";
import * as DB_ACCOUNT from "./account.db.js"
import * as DB_BUSINESS from "../business/business.db.js"
import * as DB_INDIVIDUAL from "../individual/individual.db.js"

import * as DB_FAMILY from "../family/family.db.js"
import { validateTransferAccounts } from "./account.validation.js";


export async function transferB2B(payload: ITransfer): Promise<string> {
   try {
      let { source, destination, amount } = payload;
      let sourceTransfer = (await DB_BUSINESS.getAllBusinessAccountById([source]))[0];
      let destTransfer = (await DB_BUSINESS.getAllBusinessAccountById([destination]))[0];
      validateTransferAccounts(sourceTransfer, destTransfer, amount, 10000,"B2B");      
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency, destTransfer.currency, destTransfer.balance, amount);
      return ans;
   } catch (error) {
      logger.error("transferB2B", error as Error);
      throw error;
   }
}

export async function transferB2BFX(payload: ITransfer): Promise<string> {
   try {
      let { source, destination, amount } = payload;
      let sourceTransfer = (await DB_BUSINESS.getAllBusinessAccountById([source]))[0];
      let destTransfer = (await DB_BUSINESS.getAllBusinessAccountById([destination]))[0];

      const FX = await getRate(destTransfer.currency, sourceTransfer.currency);
      validateTransferAccounts(sourceTransfer, destTransfer, amount, 10000,"B2B",true);
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency, destTransfer.currency, destTransfer.balance, amount, FX);
      return await ans;
   } catch (error) {
      logger.error("transferB2BFX", error as Error);
      throw error;
   }
}

export async function transferB2I(payload: ITransfer): Promise<string> {
   try {
      let { source, destination, amount } = payload;
      let sourceTransfer = (await DB_BUSINESS.getAllBusinessAccountById([source]))[0];
      let destTransfer = (await DB_INDIVIDUAL.getAllIndividualsAccountsById([destination]))[0];
      validateTransferAccounts(sourceTransfer, destTransfer, amount, 1000,"B2I");
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency, destTransfer.currency, destTransfer.balance, amount);
      return ans;
   } catch (error) {
      logger.error("transferB2I", error as Error);
      throw error;
   }
}

export async function transferF2B(payload: ITransfer): Promise<string> {
   try {
      let { source, destination, amount } = payload;
      let sourceTransfer =  await DB_FAMILY.getFamilyAccountByIdShort(source);
      let destTransfer = (await DB_BUSINESS.getAllBusinessAccountById([destination]))[0];
      validateTransferAccounts(sourceTransfer, destTransfer, amount, 5000,"F2B");
      let ans = exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency, destTransfer.currency, destTransfer.balance, amount);
      return ans;
   } catch (error) {
      logger.error("transferB2BFX", error as Error);
      throw error;
   }
}


export async function exectueTransfer(srcId: number, srcBalance: number, destId: number, srcCurr: string, destCurr: string, destBalance: number, amount: number, FX = 1): Promise<string> {
   try {
      srcBalance = srcBalance - amount * FX;
      destBalance = destBalance + amount;
      await DB_ACCOUNT.updateAccountsBalance([[srcId, srcBalance], [destId, destBalance]]);
      return `source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}`;
   } catch (error) {
      logger.error("transferB2BFX", error as Error);
      throw error;
   }
}

export async function updateAccountStatus(accountsId: number[], action: boolean): Promise<string> {
   try {
      let accounts:IAccount[] = await DB_ACCOUNT.getAccountsById(accountsId);
      //if some of the accounts not exists throw error
      validateStatusAccounts(accounts, accountsId, action);
      //add function that update all list of statuses
      await DB_ACCOUNT.updateAccountsStatus(accountsId, action);
      return `acounts: ${accountsId} changed to status ${action}`;
   } catch (error) {
      logger.error("transferB2BFX", error as Error);
      throw error;
   }
}

export async function getSecretKeyByAccessKey(access_key: string) {
   try {
      logger.params("getSecretKeyByAccessKey", { access_key })
      const secret_key = DB_ACCOUNT.getSecretKeyByAccessKey(access_key);
      logger.funcRet("getSecretKeyByAccessKey", secret_key);
      return secret_key;

   } catch (error) {
      logger.error("getSecretKeyByAccessKey", error as Error);
      throw error;
   }
}
