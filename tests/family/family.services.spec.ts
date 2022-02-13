import { expect,assert } from "chai";
import sinon from "sinon";
import * as family_service  from "../../src/family/family.services.js";
import DB_FAMILY from "../../src/family/family.db.js";


describe("validation middelware functions ", () => {  
    let family = {
            "currency":"USD",
            "owners":[[1,3000]],
            "agent_id": 1
    }
    let individual_accounts = [
        {
            "account_id":1,
            "currency" : "USA",  
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
            "owners_id": []
        }
        let family_full = {
            "account_id":52,
            "currency": "EUR",
            "balance": 8000,
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
            sinon.stub(DB_FAMILY,"getFamilyAccountByIdShort").resolves(family_short);
            expect(await family_service.getFamilyAccountByIdShort(52)).to.deep.equal(family_short);
        })   
    });

        context("getFamilyAccountByIdFull ", () => {
        it("should be function", () => {
            expect(family_service.getFamilyAccountByIdFull).to.be.a("Function");
        });

        it('should get full family account', async () => {
           sinon.stub(DB_FAMILY,"getFamilyAccountByIdFull").resolves(family_full);
            expect(family_service.getFamilyAccountByIdShort(52)).deep.equal(family_full);
        })
    });

    context("createFamilyAccount ", () => {
        it("should be function", () => {
            expect(family_service.createFamilyAccount).to.be.a("Function");
        });
        it('should create family account', async () => {
            sinon.stub(DB_,"convertTupelsToArray").resolves([1,2]);
            sinon.stub(objFamily,"getAllIndividualsAccountsById").resolves(individual_accounts);
            sinon.stub(objFamily,"validateAddToFamily").resolves();
            sinon.stub(objFamily,"createFamilyAccount").resolves(individual_accounts);
            sinon.stub(service,"getFamilyAccountByIdShort").resolves(individual_accounts);
            sinon.stub(objFamily,"execAddToFamily").resolves(individual_accounts);
            sinon.stub(objFamily,"execAddToFamily").resolves();
            expect(family_service.createFamilyAccount(family)).deep.equal(family_full);
        })
    });

});

//     context("closeFamilyAccount ", () => {
//         it("should be function", () => {
//             expect(closeFamilyAccount).to.be.a("Function");
//         });
//                 //should : check the implementation
//     });
//     context("addIndividualsToFamilyAccount ", () => {
//         it("should be function", () => {
//             expect(addIndividualsToFamilyAccount).to.be.a("Function");
//         });
//                 //should : check the implementation
//     });
//     context("addIndividualsToFamilyAccount ", () => {
//         it("should be function", () => {
//             expect(addIndividualsToFamilyAccount).to.be.a("Function");
//         });
//                 //should : check the implementation
//     });
//     context("removeIndividualsFromFamilyAccount ", () => {
//         it("should be function", () => {
//             expect(removeIndividualsFromFamilyAccount).to.be.a("Function");
//         });
//                 //should : check the implementation
//     });
// });


