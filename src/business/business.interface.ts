import { Address,Account } from "../account/account.interface.js";

export interface Business extends Account {
    company_id: number;
    company_name: string;
<<<<<<< HEAD
    context: string;
    address?: Address;
    address_id?:number;
}

export type pBusiness = Partial<Business>;
=======
    context?: string;
    address_id:number;
}


>>>>>>> origin/main
