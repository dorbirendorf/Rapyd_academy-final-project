import { Address,Account } from "../account/account.interface.js";

export interface Business extends Account {
    company_id: number;
    company_name: string;
    context: string;
    address?: Address;
    address_id?:number;
}

export type pBusiness = Partial<Business>;