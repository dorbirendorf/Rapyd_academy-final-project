import { Account } from "../account/account.interface.js";
import { Individual } from "../individual/individual.interface.js";

export interface Family extends Account {
    currenct : number;
    context: string;
    owners: Individual[];
    owners_id: {account_id:number}[];
}

export type pFamily = Partial<Family>
