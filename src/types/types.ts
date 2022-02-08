export interface IAddress {
    address_id?: number;
    country_name?: string;
    country_code?: number;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
}
export interface IAccount {    
    account_id : number;
    currency: string;  
    balance: number; 
    amount?: number;  
    status: Statuses;
    type:string;
}
export interface IIndividual extends IAccount {
    individual_id:number;
    first_name:string;
    last_name:string;
    email?:string;
    address?:Address;
    address_id?:number;
}
export interface IFamily extends IAccount {
    context?: string;
    owners_id?:{ account_id: number }[];
    owners?:IIndividual[];
}
export interface IBusiness extends IAccount {
    company_id: number;
    company_name: string;
    context?: string;
    address?:Address;
    address_id?:number;
}
    export enum Statuses {
        Active = "Active",
        Inactive = "Inactive",
    }
    export interface httpResponseMessage{
        status: number;
        message: string;
        data: any;
    }
   
declare global {
    namespace Express {
        interface Request {
            accounts:Partial<IAccount>[];
            id: string;
        }
    }
}



