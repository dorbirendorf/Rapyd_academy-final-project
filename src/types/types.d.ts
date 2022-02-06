import { Account } from "../account/account.interface.js";

export interface httpResponseMessage {
    status: number;
    message: string;
    data: any;
}
declare global {
    namespace Express {
        interface Request {
            account:Account
            id: string;
        }
    }
}
