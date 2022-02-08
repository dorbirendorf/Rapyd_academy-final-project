// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { updaetRowById } from "../db.utils";
import { IAccount, IIndividual } from "../types/types.js";

   export async function updateAccountStatus(primary_id:number,status:boolean):Promise<void>{ 
        await updaetRowById("accounts",{status},{primary_id});
    }

    export async function updateAccountBalance(primary_id:number,balance:number):Promise<void>{ 
        await updaetRowById("accounts",{balance},{primary_id});
    }

    export async function getAllIndividualsAccountsById(individualIds:number[]):Promise<IAccount[]>{ 
       //implemetation
       return {} as IAccount[];
    }
    getAllIndividualsAccountsById