import { Account } from "../account/account.interface.js";

export interface Business extends Account {
    company_id: number;
    company_name: string;
    context?: string;
    address_id:number;
}


