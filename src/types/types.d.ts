export interface IAddress {
    address_id?: number;
    country_name?: string;
    country_code?: string;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
}
export interface IAccount {
    account_id: number;
    currency: string;
    balance: number;
    agent_id: number;
    status: string;
    type: string;
}

export interface IUpdateAcounts {
    accounts: number[];
    action: "active" | "inactive";
}

export interface IAccountFromReq {
    account_id?: number;
    currency?: string;
    balance?: number;
    agent_id?: number;
    status?: boolean;
    type?: string;
}

export interface IAccountFromDb {
    account_id: number;
    currency: string;
    balance: number;
    agent_id: number;
    status: boolean | number;
    type: string;
}

export interface IIndividual extends IAccount {
    individual_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address?: IAddress | null;
    address_id?: number | null;
}

export interface IIndividualFromReq extends IAccountFromReq {
    individual_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address?: IAddress | null;
    address_id?: number | null;
}

export interface IIndividualFromDB extends IAccountFromDb {
    individual_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address_id?: number;
    country_name?: string;
    country_code?: string;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
}

export interface IFamily extends IAccount {
    context?: string;
    owners_id?: { account_id: number }[];
    owners?: IIndividual[];
}

export interface IFamilyForCreation extends IFamilyFromDb {
    owners: [number, number][];
}

export interface IFamilyFromDb extends IAccountFromDb {
    context?: string;
}
export interface IBusiness extends IAccount {
    company_id: number;
    company_name: string;
    context?: string;
    address?: IAddress | null;
    address_id?: number | null;

}

export interface IBusinessFromReq extends IAccountFromReq {
    company_id: number;
    company_name: string;
    context?: string;
    address?: IAddress | null;
    address_id?: number | null;

}

export interface IBusinessFromDb extends IAccountFromDb {
    company_id: number;
    company_name: string;
    context?: string;
    address?: IAddress;
    address_id?: number;
    country_name?: string;
    country_code?: string;
    postal_code?: number;
    city?: string;
    region?: string;
    street_name?: string;
    street_number?: number;
}
export interface httpResponseMessage {
    status: number;
    message: string;
    data: any;
}

export interface Config {
    configurations: { [key: string]: string }
    errors: { [key: string]: string },
    constants: { [key: string]: number },
    flags: { [key: string]: boolean },

}
export interface ITransfer {
    source: number;
    destination: number;
    amount: number;
}
export type transferType = "B2B" | "B2I" | "F2B" | "I2F";
export type transferTypeWithLimitation = "B2B" | "B2I" | "F2B";


export interface IExchange {
    rates: { [key: string]: number }
}
export type AsyncReqHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export interface IAgentKey {
    agent_id?: number;
    secret?: string;
}
declare global {
    namespace Express {
        interface Request {
            accounts: Partial<IAccountFromReq>[];
            id: string;
            agent_id: number;
            idempotency_key: string;
        }
    }
}

