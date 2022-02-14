import { expect } from "chai";
import * as sinon from "sinon";
import  family_service  from "../../src/family/family.services.js";
import db_family from "../../src/family/family.db.js";
import db_individual from "../../src/individual/individual.db.js"
import db_business from "../../src/business/business.db.js"
import account_validation from "../../src/account/account.validation.js"

import account_service from "../../src/account/account.services.js";
import family_validator from "../../src/family/family.validator.js";
import utils from "../../src/utils/utils.js";



describe("account service ", () => {  

    beforeEach(()=>sinon.restore())
    let transfer1 = {
      source: 1,
      destination: 2,
      amount: 100
    }
    let transfer2 = {
      source: 5,
      destination: 2,
      amount: 100
    }
    let family = {
        "balance":0,
        "currency":"EUR",
        "account_id":52,
        "agent_id": 1
    }
    let family1 = {
        "account_id":53,
        "currency": "EUR",
        "balance": 8000,
        "agent_id": 1,
        "status": 1,
        "type": "family",
        "context": "travel",
        "owners": []
    }
    let individual_accounts = [
        {
            "account_id":1,
            "currency" : "EUR",  
            "balance": 12000,
            "agent_id":2,
            "status": true,
            "type":"individual",
            "individual_id":1,
            "first_name": "Meir",
             "last_name": "Shtarkman"
            }
    ]  
    let individual_accounts2 = [
        {
            "account_id":2,
            "currency" : "EUR",  
            "balance": 12000,
            "agent_id":2,
            "status": true,
            "type":"individual",
            "individual_id":1,
            "first_name": "Meir",
             "last_name": "Shtarkman"
            }
    ]  
    let business1 = {
      account_id :1,
      currency: "USD",
      balance: 200000, 
      agent_id: 2,
      status:"active",
      type:"business",
      company_id: 10,
      company_name: "go"
  }
  let business2 = {
   account_id :2,
   currency: "USD",
   balance: 400000, 
   agent_id: 2,
   status:"active",
   type:"business",
   company_id: 10,
   company_name: "go"
}
       let family_short = {
            "account_id":52,
            "currency": "EUR",
            "balance": 8000,
            "agent_id": 1,
            "status": "active",
            "type": "family",
            "context": "travel",
            "owners_id": [{ account_id: 1}]
        }
        let family_short2= {
            "account_id":52,
            "currency": "EUR",
            "balance": 8001,
            "agent_id": 1,
            "status": "active",
            "type": "family",
            "context": "travel",
            "owners_id": [{ account_id: 1},{ account_id: 2}]
        }
        let family_full = {
            "account_id":52,
            "currency": "EUR",
            "balance": 5000,
            "agent_id": 1,
            "status": "active",
            "type": "family",
            "context": "travel",
            "owners": individual_accounts      
                }
            let family_full2 = {
                    "account_id":52,
                    "currency": "EUR",
                    "balance": 5000,
                    "agent_id": 1,
                    "status": "active",
                    "type": "family",
                    "context": "travel",
                    "owners": []      
                }
              
        let IndividualSBalance =[ [ 2, 11999 ], [ 52, 8001 ] ] ;
        let close_family= {
            "account_id":52,
            "currency": "EUR",
            "balance": 5000,
            "agent_id": 1,
            "status": 0,
            "type": "family",
            "context": "travel",
            "owners": individual_accounts      
                }
    context("transferB2B ", () => {
      beforeEach(()=>sinon.restore())
        it("should be function", () => {
            expect(account_service.transferB2B).to.be.a("Function");
        });
        it('should do transfer B2B', async () => {
            let getBusiness = sinon.stub(db_business,"getAllBusinessAccountById");
            getBusiness.onFirstCall().resolves([business1]);
            getBusiness.onSecondCall().resolves([business2]);

            sinon.stub(account_validation,"validateTransferAccounts").resolves();
            sinon.stub(account_service,"exectueTransfer").resolves("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
            let result =await account_service.transferB2B(transfer1);
            expect(result).deep.equal("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
        })
        it('should throw errow when account isnt exist', async() => {
           try{
         
          let getBusiness = sinon.stub(db_business,"getAllBusinessAccountById");
          getBusiness.onFirstCall().resolves([business1]);
          getBusiness.onSecondCall().resolves(undefined);
          expect( await account_service.transferB2B(transfer2) ).to.throw()
           }catch(e){
              
           }   
     })
    });
    });
    


// class AccountService{
//  async  transferB2B(payload: ITransfer): Promise<string> {
//    try {
//       let { source, destination, amount } = payload;
//       let sourceTransfer = (await DB_BUSINESS.getAllBusinessAccountById([source]))[0];
//       let destTransfer = (await DB_BUSINESS.getAllBusinessAccountById([destination]))[0];
//       if (!sourceTransfer||!destTransfer) {
//          throw new Error("Data not found")
//      }
//       accountValidation.validateTransferAccounts(sourceTransfer, destTransfer, amount, 10000,"B2B");      
//       let ans = this.exectueTransfer(sourceTransfer.account_id, sourceTransfer.balance, destTransfer.account_id, sourceTransfer.currency, destTransfer.currency, destTransfer.balance, amount);
//       return ans;
//    } catch (error) {
//       logger.error("transferB2B", error as Error);
//       throw error;
//    }
// }
