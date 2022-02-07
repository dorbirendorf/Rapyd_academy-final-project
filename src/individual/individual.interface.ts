import { Account, Address } from "../account/account.interface.js";
export interface Individual extends Account {
individual_id:number;
first_name:string;
last_name:string;
email?:string;
address?:Address;
}



