import { expect } from "chai";
import {accountsActive, accountsBelongToFamily, accountsCurrency, accountsExist, accountsTypes, allowTransfers, checkLimitTransfer, checkProperState} from "../../src/utils/validationService.js";

describe("validation service functions ", () => {
        let acconts1= ()=>[{account_id:1, currency:"ILS", balance:1000,agent_id:1,  status:true, type:"business"}]
        let acconts2 = ()=>[{account_id:2, currency:"ILS", balance:100000000,agent_id:1,  status:false, type:"business"}]
        context("accountsExist ", () => {
        it("should be function", () => {
            expect(accountsExist).to.be.a("Function");
        });         

        it("should return true if all accounts Exist ", () => {
            expect(accountsExist(acconts1(),[[1,20]])).to.equal(true);
        });
        it("should throw error if not all accounts Exist ", () => {
            expect(()=>accountsExist(acconts1(),[[1,20],[2,22]])).to.throw();
        });
    });
    context("accountsActive ", () => {
        it("should be function", () => {
            expect(accountsActive).to.be.a("Function");
        });         

        it("should return true if all accounts active ", () => {
            expect(accountsActive(acconts1())).to.equal(true);
        });
        it("should throw error if not all accounts active", () => {
            expect(()=>accountsActive(acconts2())).to.throw();
        });
    });
    context("checkProperState ", () => {
        it("should be function", () => {
            expect(checkProperState).to.be.a("Function");
        });         

        it("should return true if all accounts in the correct state ", () => {
            expect(checkProperState(acconts1(),true)).to.equal(true);
        });
        it("should throw error if some accounts arent in correct state", () => {
            expect(()=>checkProperState(acconts2(),true)).to.throw();
        });
    });
    context("accountsTypes ", () => {
        it("should be function", () => {
            expect(accountsTypes).to.be.a("Function");
        });         

        it("should return true if all accounts in the correct state ", () => {
            expect(accountsTypes(acconts1(),["business"])).to.equal(true);
        });
        it("should throw error if some accounts arent in correct state", () => {
            expect(()=>accountsTypes(acconts2(),["individual"])).to.throw();
        });
    });
    context("accountsCurrency ", () => {
        it("should be function", () => {
            expect(accountsCurrency).to.be.a("Function");
        });         

        it("should return true if all accounts have equal curreny ", () => {
            expect(accountsCurrency(acconts1(),"ILS")).to.equal(true);
        });
        it("should throw error if some accounts dont have equal currency", () => {
            expect(()=>accountsCurrency(acconts1(),"EUR",false)).to.throw();
        });
        it("should return true when not all account have same as current , but FX true", () => {
            expect(accountsCurrency(acconts1(),"EUR",true)).to.equal(true);
        });
    });
    context("accountsBelongToFamily ", () => {
        let owners= ()=>[{account_id:1,currency: "ILS",balance: 100000,status: true,type: "individual",individual_id: 6,first_name: "string",last_name: "string",agent_id:1}];

        it("should be function", () => {
            expect(accountsBelongToFamily).to.be.a("Function");
        });         

        it("should return true if all accounts belong to family ", () => {
            expect(accountsBelongToFamily(owners(),[1])).to.equal(true);
        });
        it("should throw error if some accounts dont belong to family", () => {
            expect(()=>accountsBelongToFamily(owners(),[2])).to.throw();
        });
    });
    context("allowTransfers ", () => {
        it("should be function", () => {
            expect(allowTransfers).to.be.a("Function");
        });         

        it("should return true if account allow trasfer the money ", () => {
            expect(allowTransfers(acconts1(),990,5)).to.equal(true);
        });
        it("should throw error if account doesnt allow trasfer the money", () => {
            expect(()=>allowTransfers(acconts1(),990,11)).to.throw();
        });
    });
    context("checkLimitTransfer", () => {
        it("should be function", () => {
            expect(checkLimitTransfer).to.be.a("Function");
        });         

        it("should return true if accounts with the same company name allow to trnafer 10000 from B2B ", () => {
            expect(checkLimitTransfer("B2B",10000,"Rapyd","Rapyd")).to.equal(true);
        });
        it("should throw error if accounts with the same company name dont allow to trnafer 10001 from B2B", () => {
            expect(()=>checkLimitTransfer("B2B",10001,"Rapyd","Rapyd")).to.throw();
        });
        it("should throw error if accounts with different company name dont allow to trnafer 1001 from B2B", () => {
            expect(()=>checkLimitTransfer("B2B",1001,"Rapyd","Google")).to.throw();
        });
        it("should return true if accounts with different company name allow to trnafer 1000 from B2B ", () => {
            expect(checkLimitTransfer("B2B",1000,"Rapyd","Google")).to.equal(true);
        });
        
       it("should return true if account allow trasfer the money from B2I", () => {
            expect(checkLimitTransfer("B2I",1000)).to.equal(true);
        });
        it("should throw error if accounts dont allow to trnafer 1001 from B2I", () => {
            expect(()=>checkLimitTransfer("B2I",1001)).to.throw();
        });
        it("should return true if account allow trasfer the money from F2B", () => {
            expect(checkLimitTransfer("F2B",5000)).to.equal(true);
        });
        it("should throw error if accounts dont allow to trnafer 1001 from F2B", () => {
            expect(()=>checkLimitTransfer("F2B",9999)).to.throw();
        });
    
    });
});
