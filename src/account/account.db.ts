// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { updaetRowById } from "../db.utils";

// import {db} from "../db/sql/sql.connection.js";

   export async function updateAccountStatus(primary_id:number,status:boolean):Promise<void>{ 
        await updaetRowById("accounts",{status},{primary_id});
    }

    export async function updateAccountBalance(primary_id:number,balance:number):Promise<void>{ 
        await updaetRowById("accounts",{balance},{primary_id});
    }
    