import { expect } from "chai";
import sinon from "sinon";
import businessValidator from "../../src/business/business.validator.js";
import account_validation from "../../src/account/account.validation.js"
import validtion_func from "../../src/utils/validationFunc.js"
import {Request,Response,NextFunction} from 'express';
import config from "../../src/config.js"

describe("business validadator  ", () => {

    beforeEach(()=>sinon.restore())

    context("#validatebusinessModel ", () => {

        const req = {
            body: {
                "balance":20000,
                "currency":"usd",
                "company_id":82345678,
                "company_name":"rapyd",
                "context":"finTech",
                "agent_id":1,
                "address": {
                    "country_name": "israel",
                    "country_code": "il",
                    "postal_code": 90210,
                    "city": "tel-aviv",
                    "region": "center",
                    "street_name": "begin",
                    "street_number": 132
                }
            }
        } as Request
            const res  = {} as Response;
            const next = ()=>undefined ;
  
        it("should be function", () => {
            expect(businessValidator.validateBusinessModel).to.be.a("Function");
        });

        it("should validate creation of businessAccount", () => {
            sinon.stub(account_validation, "validateAccountMandatoryFields").returns();
            sinon.stub(validtion_func, "validEntityId").returns();

            
            const nextInfo = sinon.spy(next)
            businessValidator.validateBusinessModel(req,res,nextInfo); 
            expect(nextInfo.called).to.equal(true);
        });

        it("should throw error if business account model is not valid <fail>", () => {
            sinon.stub(account_validation, "validateAccountMandatoryFields").returns();
            sinon.stub(validtion_func, "validEntityId").returns();

            try{

                businessValidator.validateBusinessModel(req,res,next); 
            }catch(err){

                expect((err as Error).message).to.equal(config.errors.MISSING_REQUIRED_FIELD);
            }
        });
   
    });
});


