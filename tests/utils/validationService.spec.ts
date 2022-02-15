import { expect } from "chai";
import sinon from "sinon";
import utils from "../../src/utils/validationService.js";

describe("validation service functions ", () => {
    afterEach(()=>sinon.restore())
        let acconts1= ()=>[{account_id:1, currency:"ILS", balance:1000, agent_id:1,  status:"active", type:"business"}]
        let acconts2 = ()=>[{account_id:2, currency:"ILS", balance:100000000, agent_id:1,  status:"inactive", type:"business"}]
        context("accountsExist ", () => {
        it("should be function", () => {
            expect(utils.accountsExist).to.be.a("Function");
        });         

        it("should return true if all accounts Exist ", () => {
            expect(utils.accountsExist(acconts1(),[[1,20]])).to.equal(true);
        });
        it("should throw error if not all accounts Exist ", () => {
            expect(()=>utils.accountsExist(acconts1(),[[1,20],[2,22]])).to.throw();
        });
    });
    context("accountsActive ", () => {
        it("should be function", () => {
            expect(utils.accountsActive).to.be.a("Function");
        });         

        it("should return true if all accounts active ", () => {
            expect(utils.accountsActive(acconts1())).to.equal(true);
        });
        it("should throw error if not all accounts active", () => {
            expect(()=>utils.accountsActive(acconts2())).to.throw();
        });
    });
    context("checkProperState ", () => {
        it("should be function", () => {
            expect(utils.checkProperState).to.be.a("Function");
        });         

        it("should return true if all accounts in the correct state ", () => {
            expect(utils.checkProperState(acconts1(),"active")).to.equal(true);
        });
        it("should throw error if some accounts arent in correct state", () => {
            expect(()=>utils.checkProperState(acconts2(),"active")).to.throw();
        });
    });
    context("accountsTypes ", () => {
        it("should be function", () => {
            expect(utils.accountsTypes).to.be.a("Function");
        });         

        it("should return true if all accounts in the correct state ", () => {
            expect(utils.accountsTypes(acconts1(),["business"])).to.equal(true);
        });
        it("should throw error if some accounts arent in correct state", () => {
            expect(()=>utils.accountsTypes(acconts2(),["individual"])).to.throw();
        });
    });
    context("accountsCurrency ", () => {
        it("should be function", () => {
            expect(utils.accountsCurrency).to.be.a("Function");
        });         

        it("should return true if all accounts have equal curreny ", () => {
            expect(utils.accountsCurrency(acconts1(),"ILS")).to.equal(true);
        });
        it("should throw error if some accounts dont have equal currency", () => {
            expect(()=>utils.accountsCurrency(acconts1(),"EUR",false)).to.throw();
        });
        it("should return true when not all account have same as current , but FX true", () => {
            expect(utils.accountsCurrency(acconts1(),"EUR",true)).to.equal(true);
        });
    });
    context("accountsBelongToFamily ", () => {
        let owners= ()=>[{account_id:1,currency: "ILS",balance: 100000,status: "acticve",type: "individual",individual_id: 6,first_name: "string",last_name: "string",agent_id:1}];

        it("should be function", () => {
            expect(utils.accountsBelongToFamily).to.be.a("Function");
        });         

        it("should return true if all accounts belong to family ", () => {
            expect(utils.accountsBelongToFamily(owners(),[1])).to.equal(true);
        });
        it("should throw error if some accounts dont belong to family", () => {
            expect(()=>utils.accountsBelongToFamily(owners(),[2])).to.throw();
        });
    });
    context("allowTransfers ", () => {
        it("should be function", () => {
            expect(utils.allowTransfers).to.be.a("Function");
        });         

        it("should return true if account allow trasfer the money ", () => {
            expect(utils.allowTransfers(acconts1(),990,5)).to.equal(true);
        });
        it("should throw error if account doesnt allow trasfer the money", () => {
            expect(()=>utils.allowTransfers(acconts1(),990,11)).to.throw();
        });
    });
    context("checkLimitTransfer", () => {
        it("should be function", () => {
            expect(utils.checkLimitTransfer).to.be.a("Function");
        });         

        it("should return true if accounts with the same company name allow to trnafer 10000 from B2B ", () => {
            expect(utils.checkLimitTransfer("B2B",10000,0,0)).to.equal(true);
        });
        it("should throw error if accounts with the same company name dont allow to trnafer 10001 from B2B", () => {
            expect(()=>utils.checkLimitTransfer("B2B",10001,0,0)).to.throw();
        });
        it("should throw error if accounts with different company name dont allow to trnafer 1001 from B2B", () => {
            expect(()=>utils.checkLimitTransfer("B2B",1001,1,0)).to.throw();
        });
        it("should return true if accounts with different company name allow to trnafer 1000 from B2B ", () => {
            expect(utils.checkLimitTransfer("B2B",1000,1,0)).to.equal(true);
        });
        
       it("should return true if account allow trasfer the money from B2I", () => {
            expect(utils.checkLimitTransfer("B2I",1000)).to.equal(true);
        });
        it("should throw error if accounts dont allow to trnafer 1001 from B2I", () => {
            expect(()=>utils.checkLimitTransfer("B2I",1001)).to.throw();
        });
        it("should return true if account allow trasfer the money from F2B", () => {
            expect(utils.checkLimitTransfer("F2B",5000)).to.equal(true);
        });
        it("should throw error if accounts dont allow to trnafer 1001 from F2B", () => {
            expect(()=>utils.checkLimitTransfer("F2B",9999)).to.throw();
        });
    
    });
});
