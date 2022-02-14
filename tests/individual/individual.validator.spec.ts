import { expect } from "chai";
import sinon from "sinon";
import individualValidator from "../../src/individual/individual.validator.js";
import account_validation from "../../src/account/account.validation.js"
import validtion_func from "../../src/utils/validationFunc.js"
import {Request,Response,NextFunction} from 'express';
import {MISSING_REQUIRED_FIELD} from "../../src/types/constants.js"

describe("individual validadator  ", () => {

    beforeEach(()=>sinon.restore())

    context("#validateIndividualModel ", () => {

        const req = {
            body: {
                "first_name": "dor",
                "last_name": "birendorf",
                "currency": "usd",
                "balance": 7000,
                "individual_id": 4444444,
                "agent_id": 1,
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
            expect(individualValidator.validateIndividualModel).to.be.a("Function");
        });

        it("should validate creation of individualAccount", () => {
            sinon.stub(account_validation, "validateAccountMandatoryFields").returns();
            sinon.stub(validtion_func, "validEntityId").returns();

            
            const nextInfo = sinon.spy(next)
            individualValidator.validateIndividualModel(req,res,next); 
            expect(nextInfo.called).to.equal(true);
        });

        it("should throw error if individual account model is not valid <fail>", () => {
            sinon.stub(account_validation, "validateAccountMandatoryFields").returns();
            sinon.stub(validtion_func, "validEntityId").returns();

            try{

                individualValidator.validateIndividualModel(req,res,next); 
            }catch(err){

                expect((err as Error).message).to.equal(MISSING_REQUIRED_FIELD);
            }
        });
   
    });
});


