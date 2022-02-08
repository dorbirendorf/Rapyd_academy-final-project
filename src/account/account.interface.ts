<<<<<<< HEAD
export interface Address {
    address_id?: number;
    country_name?: string;
    country_code?: number;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
=======
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
>>>>>>> origin/main
}
export interface Account {    
    account_id? : number;
    currency: string;  
<<<<<<< HEAD
    balance: number; 
    status: "Active" | "Inactive";
    type: "Individual" | "Business" | "Family";
=======
    balance?: number; 
    status: Statuses;
    type: Types;
>>>>>>> origin/main
}

export type pAccount = Partial<Account>;
export type pAddress = Partial<Address>;
