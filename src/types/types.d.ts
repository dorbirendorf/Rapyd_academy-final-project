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
    status: boolean;
    type:string;
}

export interface IIndividual extends IAccount {
    individual_id:number;
    first_name:string;
    last_name:string;
    email?:string;
    address?:IAddress;
    address_id?:number;
}

export interface IIndividualFromDB {
    account_id : number;
    currency: string;  
    balance: number; 
    amount?: number;  
    status: boolean;
    type:string;
    individual_id:number;
    first_name:string;
    last_name:string;
    email?:string;
    address_id?:number;
    country_name?: string;
    country_code?: number;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
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
    address?:IAddress;
    address_id?:number;
    
}
export interface IBusinessFromDb{
    account_id : number;
    currency: string;  
    balance: number; 
    amount?: number;  
    status: boolean;
    type:string;
    company_id: number;
    company_name: string;
    context?: string;
    address?:IAddress;
    address_id?:number;
    country_name?: string;
    country_code?: number;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;

}
    export interface httpResponseMessage{
        status: number;
        message: string;
        data: any;
    }
    export interface ITransfer{
        source: number;
        destination: number;
        amount: number;
    }
    export type transferType = "B2B" | "B2I" | "F2B" ;
   
declare global {
    namespace Express {
        interface Request {
            accounts:Partial<IAccount>[];
            id: string;
        }
    }
}

