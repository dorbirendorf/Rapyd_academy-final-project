import { Request, Response, NextFunction } from "express";
import idempotency_service from "../idempotency/idempotency.service.js"

class IdempotencyMiddleware {
    async idempotency(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        const idempotencyKey = req.headers["x-idempotency"];
        if (idempotencyKey) {
            req.idempotency_key = String(idempotencyKey)
            const agent_id = req.agent_id;
            const response = await idempotency_service.getResponseForOldRequest(Number(agent_id), String(idempotencyKey))
            if (response) {
                return res.status(response.status).json(response);
            }
        }
        next();

    }
}

const idempotencyMiddleware = new IdempotencyMiddleware();
export default idempotencyMiddleware