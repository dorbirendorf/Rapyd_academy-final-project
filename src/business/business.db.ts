/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OkPacket, RowDataPacket } from "mysql2";
import { Address} from "../account/account.interface.js";
import { createRow, selectRowById, selectRowByIdWithJoin} from "../db.utils.js";
import {Individual } from "../individual/individual.interface.js";
import {Business} from "./business.interface.js"

export async function createBusinessAccount(business:Business):Promise<number>{
    const accountRes = await createRow("account",{currency:business.currency,balance:business.balance,status:true, type: "business"})
    await createRow("business",{account_id:(accountRes as OkPacket).insertId,company_id:business.company_id,company_name:business.company_name,context:business.context,address_id:business.address_id})
    return (accountRes as OkPacket).insertId;
}

 export async function getBusinessAccountById(businessId:string):Promise<Business>{
    const accountRes = await selectRowByIdWithJoin("account","business",{primary_id:businessId},"primary_id","account_id");
    const businessRes = await addAddressToAccount((accountRes as RowDataPacket[])[0] as Business)
    return businessRes as Business;
}

export async function addAddressToAccount(account:Business|Individual):Promise<Business|Individual>{
    const address = await selectRowById("address",{address_id:account.address_id})
    account.address = address as Address;
    delete account.address_id;
    return account;
}

<<<<<<< HEAD

=======
export async function createBusinessAccount(business:business):Promise<void>{
   //implementation
   }

 export async function getBusinessAccountById(businessId:string){
    //implementation
   }
>>>>>>> upstream/main
