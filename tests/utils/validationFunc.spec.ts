import { expect } from "chai";
import sinon from "sinon";
import utils_validate from "../../src/utils/validationFunc.js";


describe("validation middelware functions ", () => {
    afterEach(()=>sinon.restore())

    context("checkBalance ", () => {
        it("should be function", () => {
            expect(utils_validate.checkBalance).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(utils_validate.checkBalance(1000,2000)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>utils_validate.checkBalance(2000,1000)).to.throw();
        });
    });

    context("validIndividualId ", () => {
  
        it("should be function", () => {
            expect(utils_validate.validEntityId).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(utils_validate.validEntityId(7,1234567)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>utils_validate.validEntityId(7,1234)).to.throw();
        });
    });

    context("amountPositive ", () => {
  
        it("should be function", () => {
            expect(utils_validate.amountPositive).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(utils_validate.amountPositive(1000)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>utils_validate.amountPositive(-1000)).to.throw();
        });
        it("should throw error if not ok ", () => {
            expect(()=>utils_validate.amountPositive(0)).to.throw();
        });
    });

    context("sumFamilyAmounts ", () => {
  
        it("should be function", () => {
            expect(utils_validate.sumFamilyAmounts).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(utils_validate.sumFamilyAmounts([[1,1000],[2,1000],[3,1000]],2500)).to.equal(3000);
        });
        it("should throw error if not ok ", () => {
            expect(()=>utils_validate.sumFamilyAmounts([[1,1000],[2,1000],[3,1000]],6000)).to.throw();
        });
        
    });
});

