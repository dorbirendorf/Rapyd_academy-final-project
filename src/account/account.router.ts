import express, { Response, Request, Router, NextFunction } from "express";
import raw from "../middleware/route.async.wrapper.js";
import accountValidation from "./account.validation.js";
import account_service from "./account.services.js";
import responseFactory from "../responses/responseFactory.js";
import idempotency_Db from "../idempotency/idempotency.db.js";
import { ITransfer, IUpdateAcounts } from "../types/types.js";

class AccountRouter {
    router: Router;
    constructor() {
        this.router = express.Router();
        this.router.patch(
            "/",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateStatus(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const body = req.body as IUpdateAcounts;
                const ans = await account_service.updateAccountStatus(
                    body.accounts,
                    body.action
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "accounts status update comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );

        this.router.post(
            "/transfer/b2b",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateTransferModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                let ans = await account_service.transferB2B(
                    req.body as ITransfer
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "transfer B2B comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );

        this.router.post(
            "/transfer/b2bfx",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateTransferModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const ans = await account_service.transferB2BFX(
                    req.body as ITransfer
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "transfer B2BFX comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );

        this.router.post(
            "/transfer/b2i",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateTransferModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const ans = await account_service.transferB2I(
                    req.body as ITransfer
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "transfer B2I comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );

        this.router.post(
            "/transfer/f2b",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateTransferModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const ans = await account_service.transferF2B(
                    req.body as ITransfer
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "transfer F2B comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );

        this.router.post(
            "/transfer/i2f",
            (req: Request, res: Response, next: NextFunction) => {
                accountValidation.validateTransferModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const ans = await account_service.transferI2F(
                    req.body as ITransfer
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "transfer I2F comleted",
                    201
                );
                if (req.idempotency_key) {
                    await idempotency_Db.createInstanceOfResponse(
                        resMessage,
                        req.idempotency_key,
                        req.agent_id
                    );
                }
                res.status(resMessage.status).json(resMessage);
            })
        );
    }
}
const router = new AccountRouter();

export default router;
