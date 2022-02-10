/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OkPacket, RowDataPacket } from "mysql2";
import { createRow, selectRowById, selectRowByIdWithJoin} from "../db.utils.js";
import { IAddress, IBusiness, IIndividual } from "../types/types.js";


export async function createBusinessAccount(business:Partial<IBusiness>):Promise<number>{
    const accountRes = await createRow("account",{currency:business.currency,balance:business.balance,status:true, type: "business"})
    await createRow("business",{account_id:(accountRes as OkPacket).insertId,company_id:business.company_id,company_name:business.company_name,context:business.context,address_id:business.address_id})
    return (accountRes as OkPacket).insertId;
}

 export async function getBusinessAccountById(accountId:number):Promise<IBusiness>{
    const accountRes = await selectRowByIdWithJoin("account","business",{primary_id:accountId},"primary_id","account_id");
    const businessRes = await addAddressToAccount((accountRes as RowDataPacket[])[0] as IBusiness)
    return businessRes as IBusiness;
}

export async function addAddressToAccount(account:IBusiness|IIndividual):Promise<IBusiness|IIndividual>{
    const address = await selectRowById("address",{address_id:account.address_id})
    account.address = address as IAddress;
    delete account.address_id;
    return account;
}

