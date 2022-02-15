import { expect } from "chai";
import validate_family from "../../src/family/family.validator.js";
import {Request,Response,NextFunction} from 'express';
import validate_account from "../../src/account/account.validation.js";
import validation_func from "../../src/utils/validationFunc.js";
import validation_service from "../../src/utils/validationService.js"
import sinon from "sinon";
import utils from "../../src/utils/utils.js";

describe("account validadation", () => {
    beforeEach(()=>sinon.restore())
   
    const req = {
        body: {
            source:1,
            destination:2,
            amount:3000
            }
    } as Request
    const req2 = {
        body: {
            source:1,
            amount:3000
            }
    } as Request
    const req3 = {
        body: {
            account:[1],
            action:"active",
            }
    } as Request
    const req4 = {
        body: {
            account:[1],
            action:"5",
            }
    } as Request
    const next=()=>1;
        const res  = {} as Response;
  

    context("#validateTransferModel ", () => {
        it("should be function", () => {
            expect(validate_account.validateTransferModel).to.be.a("Function");
        });
        it("should validate account transfer model", () => {
            sinon.stub(validation_func,"amountPositive").returns();
            const nextInfo = sinon.spy(next)
            validate_account.validateTransferModel(req,res,nextInfo); 
            expect(nextInfo.called).to.equal(true);
        });
        it('should throw error when some requierd field miss', async () => {  
           try{
            validate_account.validateTransferModel(req2,res,next); 
           }
           catch(error:any){
               expect(error.message).to.equal("Missing requiered field");
            }
        })
        context("#validateStatus ", () => {
            it("should be function", () => {
                expect(validate_account.validateStatus).to.be.a("Function");
            });
            it("should validate status", () => {
                const nextInfo = sinon.spy(next)
                validate_account.validateStatus(req3,res,nextInfo); 
                expect(nextInfo.called).to.equal(true);
            });
            it('should throw error when some requierd field miss', async () => {  
               try{
                validate_account.validateTransferModel(req4,res,next); 
               }
               catch(error:any){
                   expect(error.message).to.equal("Missing requiered field");
                }
            })
    });
});
});
