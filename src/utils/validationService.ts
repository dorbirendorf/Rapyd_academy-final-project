/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IAccount, IIndividual, transferType } from "../types/types.js";
import { ACCOUNT_BALLANCE_LOW, INVALID_AMOUNT_VALUE, INVALID_FILED_VALUE, SOMTHING_WENT_WRONG } from '../types/constants.js';
import logger from "./logger.js";

export function accountsExist(accounts: IAccount[], tuples: [number, number][]): boolean {
   try {
      logger.params("accountsExist", {accounts,tuples})

      if (tuples.length !== accounts.length) {
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts are exsits`)
      }
      logger.funcRet("accountsExist", true)

      return true;
   } catch (err) {
      logger.error("accountsExist", err as Error)
      throw err
   }
}
export function accountsActive(accounts: IAccount[]): boolean {
   try {
      logger.params("accountsActive", {accounts})
      const allActive: boolean = accounts.every(acc => acc.status == true);
      if (!allActive) {
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts are active`)
      }
      logger.funcRet("accountsActive", true)

      return true;
   } catch (err) {
      logger.error("accountsActive", err as Error)
      throw err
   }
}
export function checkProperState(accounts: IAccount[], action: boolean): boolean {
   try {
      logger.params("checkProperState", {accounts,action})

      const allStatusProper: boolean = accounts.every(acc => acc.status == action);
      if (!allStatusProper) {
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts ${action}`)
      }
      logger.funcRet("checkProperState", true)

      return true;
   } catch (err) {
      logger.error("checkProperState", err as Error)
      throw err
   }
}

export function accountsTypes(accounts: IAccount[], type: string[]): boolean {
   try {
      logger.params("accountsTypes", {accounts,type})

      const allAccepttype: boolean = accounts.every(acc => (acc.type === type[0] || acc.type === type[1]));
      if (!allAccepttype) {
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts are the type ${type[0]} or ${type[1]} `)
      }
      logger.funcRet("accountsTypes", true)

      return true;
   } catch (err) {
      logger.error("accountsTypes", err as Error)
      throw err
   }
}
export function accountsCurrency(accounts: IAccount[], currency: string, FX = false): boolean {
   try {
      logger.params("accountsCurrency",{accounts,currency,FX})

      if (FX) return true;
      const allCurrency: boolean = accounts.every(acc => acc.currency.toLowerCase() === currency.toLowerCase());
      if (!allCurrency) {
         throw new Error(`${INVALID_FILED_VALUE}- not all accounts have same currency`)
      }
      logger.funcRet("accountsCurrency", true)

      return true;
   } catch (err) {
      logger.error("accountsCurrency", err as Error)
      throw err
   }
}
export function accountsBelongToFamily(owners: IIndividual[], accounts: number[]): boolean {
   try {
      logger.params("accountsBelongToFamily", {owners,accounts})

      const check = accounts.every(id => owners.some(owner=> owner.account_id === id));
      if (!check) {
         throw new Error(`${INVALID_FILED_VALUE}- not all account belong to this family...`)
      }

      logger.funcRet("accountsBelongToFamily", true)

      return true;
   } catch (err) {
      logger.error("accountsBelongToFamily", err as Error)
      throw err
   }
}

export function allowTransfers(accounts: IAccount[], amount: number, minBalance: number): boolean {
   try {
      logger.params("allowTransfers", {accounts,amount,minBalance})

      const allTransfers: boolean = accounts.every(acc => (acc.balance - amount > minBalance));
      if (!allTransfers) {
         throw new Error(`${ACCOUNT_BALLANCE_LOW}- not all accounts have enought balance`)
      }
      logger.funcRet("allowTransfers", true)

      return true;
   } catch (err) {
      logger.error("allowTransfers", err as Error)
      throw err
   }
}
export function checkLimitTransfer(type: transferType, amount: number, sourceId?: number, destId?: number): boolean {
   try {
      logger.params("checkLimitTransfer", { type, amount, sourceId, destId })

      const max_tranfare = {
         "F2B": 5000,
         "B2I": 1000,
         "B2B": {
            "SC": 10000,
            "DC": 1000
         }
      }
      let limitTransfer = (type === "B2B") ?
         ((sourceId === destId) ? max_tranfare[type].SC : max_tranfare[type].DC) :
         max_tranfare[type];

      if (amount > limitTransfer) {
         throw new Error(`${INVALID_AMOUNT_VALUE}- transfer is limited to ${limitTransfer}`);
      }
      logger.funcRet("checkLimitTransfer", true)

      return true;
   } catch (err) {
      logger.error("checkLimitTransfer", err as Error)
      throw err
   }
}