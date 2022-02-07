/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OkPacket } from "mysql2";
import { pAddress} from "../account/account.interface.js";
import { createRow, selectRowById, selectRowByIdWithJoin} from "../db.utils.js";
import {pIndividual } from "../individual/individual.interface.js";
import {Business,pBusiness} from "./business.interface.js"

export async function createBusinessAccount(business:Business):Promise<number>{
    const accountRes = await createRow("account",{currency:business.currency,balance:business.balance,status:true})
    const res =  await createRow("business",{account_id:(accountRes as OkPacket).insertId,company_id:business.company_id,company_name:business.company_name,context:business.context,address_id:business.address_id})
    if(res){}
    return (accountRes as OkPacket).insertId;
}

 export async function getBusinessAccountById(businessId:string):Promise<pBusiness>{
    const accountRes = await selectRowByIdWithJoin("account","business",{primary_id:businessId},"primary_id","account_id");
    const businessRes = await addAddressToAccount(accountRes as pBusiness)
    return businessRes;
}

export async function addAddressToAccount(account:pBusiness|pIndividual):Promise<pBusiness|pIndividual>{
    const address = await selectRowById("address",{address_id:account.address_id})
    account.address = address as pAddress;
    delete account.address_id;
    return account;
}


