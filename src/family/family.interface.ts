import { Account } from "../account/account.interface.js";
export interface Family extends Account {
<<<<<<< HEAD
    currenct : number;
    context: string;
    owners: Individual[];
    owners_id: {account_id:number}[];
}

export type pFamily = Partial<Family>
=======
    context?: string;
    owners:[number,number][];
}
//family create
>>>>>>> origin/main
