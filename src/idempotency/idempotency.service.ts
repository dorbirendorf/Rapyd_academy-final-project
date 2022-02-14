import { httpResponseMessage } from "../types/types.js";

import DB_IDEMPOTENCY from "./idempotency.db.js";
class IdempotencyService {
    async createBusinessAccount(agentId:number,requestKey:string,message:httpResponseMessage): Promise<void> {
        await DB_IDEMPOTENCY.createInstanceOfResponse(message,requestKey,agentId)
    }

  async getResponseForOldRequest(agentId: number,requestKey:string): Promise<httpResponseMessage|undefined> {
    const answer = await DB_IDEMPOTENCY.getResponseFromDb(agentId,requestKey)
    
    return answer;
  }

}

const service = new IdempotencyService()
export default service;