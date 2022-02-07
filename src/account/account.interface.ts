import { Statuses, Types } from "../types/types.js";

export interface Address {
    address_id: number;
    country_name: string;
    country_code: number;
    postal_code: number;
    city: string;
    region: string;
    street_name: string;
    street_number: number;
}
export interface Account {    
    account_id? : number;
    currency: string;  
    balance?: number; 
    status: Statuses;
    type: Types;
}

