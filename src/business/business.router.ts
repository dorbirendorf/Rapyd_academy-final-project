import express, { Response, Request, Router, NextFunction } from "express";
import raw from "../middleware/route.async.wrapper.js";
import business_service from "./business.services.js";
import { IBusiness } from "../types/types.js";
import business_validator from "./business.validator.js";
import validation_func from "../utils/validationFunc.js";
import responseFactory from "../responses/responseFactory.js";
import idempotency_Db from "../idempotency/idempotency.db.js";

class BusinessRouter {
    router: Router;

    constructor() {
        this.router = express.Router();

        // CREATES A NEW BUSINESS_ACOUNT
        this.router.post(
            "/",
            (req: Request, res: Response, next: NextFunction) => {
                business_validator.validateBusinessModel(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const id = await business_service.createBusinessAccount(
                    req.accounts[0] as Partial<IBusiness>
                );
                const ans = await business_service.getBusinessAccountById(id);
                const resMessage = responseFactory.createResponse(
                    ans,
                    "Account created",
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

        // GET FULL BUSINESS_ACOUNT BY ID
        this.router.get(
            "/:id",
            (req: Request, res: Response, next: NextFunction) => {
                validation_func.validateAccountId(req, res, next);
            },
            raw(async (req: Request, res: Response) => {
                const ans = await business_service.getBusinessAccountById(
                    Number(req.params.id)
                );
                const resMessage = responseFactory.createResponse(
                    ans,
                    "Account found",
                    201
                );
                res.status(resMessage.status).json(resMessage);
            })
        );
    }
}

const router = new BusinessRouter();
export default router;
