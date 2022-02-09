/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { log } from "console";
import { sqlRes, updaetRowById, updateMultipleRowsById } from "../db.utils.js";
import { IAccount } from "../types/types.js";

   export async function updateAccountStatus(primary_id:number[],status:boolean):Promise<sqlRes>{ 
        const idsArray = primary_id.map(account_id=>{return {account_id}})
        const statusArray = primary_id.map(()=>{return {status}})
        const res = await updateMultipleRowsById("account",statusArray,idsArray);
        console.log(res);
        return res
    }

    export async function updateAccountBalance(idsAndBalances:[number,number][]):Promise<sqlRes>{ 
        const idsArray = idsAndBalances.map(pair=> {return{account_id:pair[0]}})
        const balanceArray = idsAndBalances.map(pair=> {return{balance:pair[1]}})
        const res =  await updaetRowById("account",balanceArray,idsArray);
        console.log(res);
        return res
    }

