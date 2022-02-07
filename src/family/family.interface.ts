import { Account } from "../account/account.interface.js";
export interface Family extends Account {
    context?: string;
    owners:[number,number][];
}
//family create