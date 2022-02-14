import { expect } from "chai";
import sinon from "sinon";
import  family_service  from "../../src/family/family.services.js";
import db_family from "../../src/family/family.db.js";
import db_individual from "../../src/individual/individual.db.js"
import db_account from "../../src/account/account.db.js";
import family_validator from "../../src/family/family.validator.js";
import utils from "../../src/utils/utils.js";
describe("validation middelware functions ", () => {  

    beforeEach(()=>sinon.restore())
    let family = {
        "balance":0,
        "currency":"EUR",
        "account_id":52,
        "agent_id": 1
    }
    let family_full_empty = {
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
       let family_short = {
            "account_id":52,
            "currency": "EUR",
            "balance": 8000,
            "agent_id": 1,
            "status": 1,
            "type": "family",
            "context": "travel",
            "owners_id": [{ account_id: 1}]
        }
        let family_short2= {
            "account_id":52,
            "currency": "EUR",
            "balance": 8000,
            "agent_id": 1,
            "status": 1,
            "type": "family",
            "context": "travel",
            "owners_id": [{ account_id: 1},{ account_id: 2}]
        }
        let family_full = {
            "account_id":52,
            "currency": "EUR",
            "balance": 5000,
            "agent_id": 1,
            "status": 1,
            "type": "family",
            "context": "travel",
            "owners": individual_accounts      
                }
         
    context("getFamilyAccountByIdShort ", () => {
        it("should be function", () => {
            expect(family_service.getFamilyAccountByIdShort).to.be.a("Function");
        });

        it('should get family account', async () => {
            sinon.stub(db_family,"getFamilyAccountByIdShort").resolves(family_short);
            expect(await family_service.getFamilyAccountByIdShort(52)).to.deep.equal(family_short);
        //throw
        })   
    });

        context("getFamilyAccountByIdFull ", () => {
        it("should be function", async() => {
            expect(await family_service.getFamilyAccountByIdFull).to.be.a("Function");
        });

        it('should get full family account', async () => {
           sinon.stub(db_family,"getFamilyAccountByIdFull").resolves(family_full);
            expect(await family_service.getFamilyAccountByIdFull(52)).deep.equal(family_full);
            //throw
        })
    });
    context("getFamilyAccountById ", () => {
        it("should be function", async() => {
            expect(await family_service.getFamilyAccountById).to.be.a("Function");
        });

        it('should get full family account', async () => {
           sinon.stub(db_family,"getFamilyAccountByIdFull").resolves(family_full);
            expect(await family_service.getFamilyAccountById(52,"full")).deep.equal(family_full);
            //throw
        })
    });
    context("createFamilyAccount ", () => {
        it("should be function", () => {
            expect(family_service.createFamilyAccount).to.be.a("Function");
        });
        it('should create family account', async () => {
            sinon.stub(utils,"convertTupelsToArray").resolves([1,2]);
            sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves(individual_accounts);
            sinon.stub(family_validator,"validateAddToFamily").resolves();
            sinon.stub(db_family,"createFamilyAccount").resolves(52);
            sinon.stub(family_service,"getFamilyAccountByIdShort").resolves(family_short);
            sinon.stub(family_service,"execAddToFamily").resolves(family_full);
            expect(await family_service.createFamilyAccount(family,[[1,5001]],"EUR")).deep.equal(family_full);
        })
    });
    context("execAddToFamily ", () => {
        it("should be function", () => {
            expect(family_service.execAddToFamily).to.be.a("Function");
        });
        it('should execute add individuals to family account', async () => {
            sinon.stub(family_service,"getFamilyAccountById").resolves(family_short2);
            sinon.stub(db_account,"updateAccountsBalance").resolves();
            sinon.stub(db_family,"addIndividualsToFamilyAccount").resolves();
            expect(await family_service.execAddToFamily([2],individual_accounts2,[[2,3000]],family_short,"short")).deep.equal(family_short2);
        })
    });
    context("execRemoveFromFamily ", () => {
        it("should be function", () => {
            expect(family_service.execRemoveFromFamily).to.be.a("Function");
        });
        it('should execute remove individuals from family account', async () => {
            sinon.stub(db_account,"updateAccountsBalance").resolves();
            sinon.stub(db_family,"removeIndividualsFromFamilyAccount").resolves();    
            sinon.stub(family_service,"getFamilyAccountById").resolves(family_short);
            expect(await family_service.execRemoveFromFamily(individual_accounts2,[[2,3000]],family_short2,3000,"short",52)).deep.equal(family_short);
        })
    });
    context("closeFamilyAccount ", () => {
        it("should be function", () => {
            expect(family_service.closeFamilyAccount).to.be.a("Function");
        });
        it('should execute close family account', async () => {  
            sinon.stub(family_service,"getFamilyAccountByIdFull").resolves(family_full_empty);
            sinon.stub(db_account,"updateAccountsStatus").resolves();
            expect(await family_service.closeFamilyAccount(53)).undefined;
        })
    });

    context("addIndividualsToFamilyAccount ", () => {
        it("should be function", () => {
            expect(family_service.closeFamilyAccount).to.be.a("Function");
        });
        it('should add individuals from family account', async () => {  
            sinon.stub(family_service,"getFamilyAccountByIdShort").resolves(family_short);
            sinon.stub(utils,"convertTupelsToArray").resolves([2,3000]);
            sinon.stub(db_individual,"getAllIndividualsAccountsById").resolves(individual_accounts2);
            sinon.stub(family_validator,"validateAddToFamily").resolves();
            sinon.stub(family_service,"execAddToFamily").resolves(family_short2);
            expect(await family_service.addIndividualsToFamilyAccount(52,[[2,3000]],"short")).deep.equal(family_short2);
        })
    });
});
