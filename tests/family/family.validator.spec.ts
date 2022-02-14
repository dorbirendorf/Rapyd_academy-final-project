import { expect } from "chai";
import validate_family from "../../src/family/family.validator.js";
import {Request,Response,NextFunction} from 'express';
import validate_account from "../../src/account/account.validation.js";
import validation_func from "../../src/utils/validationFunc.js";
import validation_service from "../../src/utils/validationService.js"
import sinon from "sinon";
import utils from "../../src/utils/utils.js";

describe("family validadator functions ", () => {
    beforeEach(()=>sinon.restore())
   
    const req = {
        body: {
            owners:[[2,5000],[1,120000]],
            currency:"USD",
            agent_id:3
            }
    } as Request
    const req2 = {
        body: {
            agent_id:3
            }
    } as Request
    const req3 = {
        body: {
            owners:[["2",5000],[1,120000]],
            currency:"USD",
            agent_id:3                }
    } as Request
    const req4 = {
        body: {
            owners:[[2,5000],[1,120000]],
            account_id:1,
                     }
    } as Request
    const req5 = {
        body: {
            owners:[["2",5000],[1,120000]],
            account_id:1,
                     }
    } as Request
    const req6 = {
        body: {
            owners:[[2,5000],[1,120000]],
            account_id:"1",
                     }
    } as Request
    const next=()=>1;
        const res  = {} as Response;
            let individual_accounts = [
        {
            "account_id":2,
            "currency" : "EUR",  
            "balance": 12000,
            "agent_id":2,
            "status": "active",
            "type":"individual",
            "individual_id":1,
            "first_name": "Meir",
             "last_name": "Shtarkman"
            }
    ]  
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
    context("#validateIndividualModel ", () => {
        it("should be function", () => {
            expect(validate_family.validateFamilyModel).to.be.a("Function");
        });
        it("should validate creation of family", () => {
            sinon.stub(validate_account, "validateAccountMandatoryFields").returns();
            sinon.stub(validation_func,"sumFamilyAmounts").returns(125000);
            const nextInfo = sinon.spy(next)
            validate_family.validateFamilyModel(req,res,nextInfo); 
            expect(nextInfo.called).to.equal(true);
        });
        it('should throw error when some requierd field miss', async () => {  
           try{
            await validate_family.validateFamilyModel(req2,res,next); 
           }
           catch(error:any){
               expect(error.message).to.equal("Missing requiered field - we must get list of owners");
            }
        })
        it('should throw error when not all tupels list are valid', async () => {  
            try{
             await validate_family.validateFamilyModel(req3,res,next); 
            }
            catch(error:any){
                expect(error.message).to.equal("Invalid filed value- not all tupels list are valid");
             }
         })
    });
    context("#validateAddToFamily ", () => {
        it("should be function", () => {
            expect(validate_family.validateAddToFamily).to.be.a("Function");
        });
        it('should validate before add to family account', async () => {
            sinon.stub(validation_service,"accountsExist").returns(true);
            sinon.stub(validation_service,"accountsActive").returns(true);
            sinon.stub(validation_service,"accountsCurrency").returns(true);
            sinon.stub(validation_service,"allowTransfers").returns(true);
            expect(await validate_family.validateAddToFamily(individual_accounts,[[2,8000]],"EUR")).undefined;
        })
    });
    context("#validateRemoveFromFamily ", () => {
        it("should be function", () => {
            expect(validate_family.validateRemoveFromFamily).to.be.a("Function");
        });
        it('should validate before remove from family account', async () => {
            sinon.stub(validation_service,"accountsExist").returns(true);
             sinon.stub(utils,"convertTupelsToArray").returns([2]);
            sinon.stub(validation_service,"accountsBelongToFamily").returns(true);
            expect(await validate_family.validateRemoveFromFamily(individual_accounts,[[2,8000]],family_full)).undefined;
        })
    });
////
context("#validateUpdateAccounts ", () => {
    it("should be function", () => {
        expect(validate_family.validateUpdateAccounts).to.be.a("Function");
    });
    it("should validate update family", async() => {
        const nextInfo = sinon.spy(next)
         await validate_family.validateUpdateAccounts(req4,res,nextInfo); 
         expect(nextInfo.called).to.equal(true);
        });
    it('should throw error when tupels isnt of type number', async () => {  
       try{
        const nextInfo = sinon.spy(next)
        await validate_family.validateUpdateAccounts(req5,res,nextInfo); 
    }
       catch(error:any){
           expect(error.message).to.equal("Invalid filed value- not all tupels list are valid");
        }
    })
    it('should throw error when some account id isnt number', async () => {  
        try{
         const nextInfo = sinon.spy(next)
         await validate_family.validateUpdateAccounts(req6,res,nextInfo); 
     }
        catch(error:any){
            expect(error.message).to.equal("Invalid filed value - account id isnt accept");
         }
     })
});
});