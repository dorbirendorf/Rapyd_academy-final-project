import { expect } from "chai";
import * as sinon from "sinon";
import  db_account  from "../../src/account/account.db.js";
import db_family from "../../src/family/family.db.js";
import db_individual from "../../src/individual/individual.db.js"
import db_business from "../../src/business/business.db.js"
import account_validation from "../../src/account/account.validation.js"
import account_service from "../../src/account/account.services.js";
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
    // let family1 = {
    //     "account_id":53,
    //     "currency": "EUR",
    //     "balance": 8000,
    //     "agent_id": 1,
    //     "status": 1,
    //     "type": "family",
    //     "context": "travel",
    //     "owners": []
    // }
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
    let business1 = {
      account_id :1,
      currency: "ILS",
      balance: 200000, 
      agent_id: 2,
      status:"active",
      type:"business",
      company_id: 10,
      company_name: "go"
  }
  let business2 = {
   account_id :2,
   currency: "ILS",
   balance: 400000, 
   agent_id: 2,
   status:"active",
   type:"business",
   company_id: 10,
   company_name: "go"
}
const individual = {
    account_id:2,
   agent_id: 1,
   currency: "usd",
   balance: 1200000,
    status: "active",
    type: "individual",
   individual_id: 4444444,
   first_name: "dor",
   last_name: "birendorf",
};
let family= {
    "account_id":1,
    "currency": "EUR",
    "balance": 800001,
    "agent_id": 1,
    "status": "active",
    "type": "family",
    "context": "travel",
    "owners_id": [{ account_id: 1},{ account_id: 2}]
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
    context("transferB2I ", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.transferB2B).to.be.a("Function");
          });
          it('should do transfer B2I', async () => {
        sinon.stub(db_business,"getAllBusinessAccountById").resolves([business1]);
        sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves([individual]);
  
              sinon.stub(account_validation,"validateTransferAccounts").resolves();
              sinon.stub(account_service,"exectueTransfer").resolves("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
              let result =await account_service.transferB2I(transfer1);
              expect(result).deep.equal("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
          })
          it('should throw errow when account isnt exist', async() => {
             try{
           
                sinon.stub(db_business,"getAllBusinessAccountById").resolves([business1]);
                sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves([individual]);
            expect( await account_service.transferB2I(transfer2)).to.throw()
             }catch(e){
                
             }   
       })
      });
      context("transferF2B", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.transferF2B).to.be.a("Function");
          });
          it('should do transfer F2B', async () => {        
              sinon.stub(db_family,"getFamilyAccountByIdShort").resolves(family);
        sinon.stub(db_business,"getAllBusinessAccountById").resolves([business1]);
              sinon.stub(account_validation,"validateTransferAccounts").resolves();
              sinon.stub(account_service,"exectueTransfer").resolves("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
              let result =await account_service.transferF2B(transfer1);
              expect(result).deep.equal("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
          })
          it('should throw errow when account isnt exist', async() => {
             try{
           
                sinon.stub(db_family,"getFamilyAccountByIdShort").resolves(family);
                sinon.stub(db_business,"getAllBusinessAccountById").resolves([business1]);
            expect( await account_service.transferF2B(transfer2)).to.throw()
             }catch(e){
                
             }   
       })
      });
      context("transferI2F", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.transferI2F).to.be.a("Function");
          });
          it('should do transfer I2F', async () => {     
            sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves([individual]);
              sinon.stub(db_family,"getFamilyAccountByIdShort").resolves(family);
              sinon.stub(account_validation,"validateTransferAccounts").resolves();
              sinon.stub(account_service,"exectueTransfer").resolves("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
              let result =await account_service.transferI2F(transfer1);
              expect(result).deep.equal("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
          })
          it('should throw errow when account isnt exist', async() => {
             try{
                sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves([individual]);
                sinon.stub(db_family,"getFamilyAccountByIdShort").resolves(family);
            expect( await account_service.transferI2F(transfer2)).to.throw()
             }catch(e){
                
             }   
       })
      });
    context("transferB2BFX ", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.transferB2BFX).to.be.a("Function");
          });
          it('should do transferB2BFX', async () => {
              let getBusiness = sinon.stub(db_business,"getAllBusinessAccountById");
              getBusiness.onFirstCall().resolves([business1]);
              getBusiness.onSecondCall().resolves([business2]);
              sinon.stub(utils,"getRate");
              sinon.stub(account_validation,"validateTransferAccounts").resolves();
              sinon.stub(account_service,"exectueTransfer").resolves("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
              let result =await account_service.transferB2BFX(transfer1);
              expect(result).deep.equal("source: ${srcId},balance: ${srcBalance},currency: ${srcCurr}, destination: ${destId},balance: ${destBalance},currency: ${destCurr}");
          })
          it('should throw errow when account isnt exist', async() => {
             try{
           
            let getBusiness = sinon.stub(db_business,"getAllBusinessAccountById");
            getBusiness.onFirstCall().resolves([business1]);
            getBusiness.onSecondCall().resolves(undefined);
            expect( await account_service.transferB2BFX(transfer2)).to.throw()
             }catch(e){
                
             }   
       })
      });
      context("exectueTransfer", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.exectueTransfer).to.be.a("Function");
          });
          it('should do exectueTransfer', async () => {
              sinon.stub(db_account,"updateAccountsBalance");
          
              expect(await account_service.exectueTransfer (1,10000000, 2, "USD", "USD", 50,1000,1)).deep.equal("source: 1,balance: 9999000,currency: USD, destination: 2,balance: 1050,currency: USD");
          })
      });
      context("updateAccountStatus", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.updateAccountStatus).to.be.a("Function");
          });
          it('should do exectueTransfer', async () => {
              sinon.stub(db_account,"getAccountsById");
              sinon.stub(account_validation,"validateStatusAccounts");
              sinon.stub(db_account,"updateAccountsStatus").resolves();
              expect(await account_service.updateAccountStatus([1,2],"active")).to.equal("acounts: 1,2 changed to status active");
          })
      });

      context("getSecretKeyByAccessKey", () => {
        beforeEach(()=>sinon.restore())
          it("should be function", () => {
              expect(account_service.getSecretKeyByAccessKey).to.be.a("Function");
          });
          it('should do getSecretKeyByAccessKey', async () => {
              sinon.stub(db_account,"getSecretKeyByAccessKey").resolves({agent_id:1, secret:"secret"});
              
              expect(await account_service.getSecretKeyByAccessKey("access")).to.deep.equal({agent_id:1, secret:"secret"});
          })
      });
    });
    

