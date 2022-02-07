import { Account } from "../account/account.interface.js";
export enum Types {
    Individual = "Individual",
    Business = "Business",
    Family = "Family",
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

export interface OutputResponse{
    [key: string]: any;
}
export interface ResponseObj extends OutputResponse {
    code: number;
    message: string;
    data?: any;
    refresh_token?: any;
    access_token?: any;
}


declare global {
    namespace Express {
        interface Request {
            accounts:Account[];
            id: string;
        }
    }
}
