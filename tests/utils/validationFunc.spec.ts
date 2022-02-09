import { expect } from "chai";
import { checkBalance,validIndividualId,amountPositive ,sumFamilyAmounts} from "../../src/utils/validationFunc.js";


describe("validation functions ", () => {
    context("checkBalance ", () => {
  
        it("should be function", () => {
            expect(checkBalance).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(checkBalance(1000,2000)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>checkBalance(2000,1000)).to.throw();
        });
    });

    context("validIndividualId ", () => {
  
        it("should be function", () => {
            expect(validIndividualId).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(validIndividualId(7,1234567)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>validIndividualId(7,1234)).to.throw();
        });
    });

    context("amountPositive ", () => {
  
        it("should be function", () => {
            expect(amountPositive).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(amountPositive(1000)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>amountPositive(-1000)).to.throw();
        });
        it("should throw error if not ok ", () => {
            expect(()=>amountPositive(0)).to.throw();
        });
    });

    context("sumFamilyAmounts ", () => {
  
        it("should be function", () => {
            expect(sumFamilyAmounts).to.be.a("Function");
        });
        it("should return undefined if ok ", () => {
            expect(sumFamilyAmounts([[1,1000],[2,1000],[3,1000]],2500)).to.be.undefined
        });
        it("should throw error if not ok ", () => {
            expect(()=>sumFamilyAmounts([[1,1000],[2,1000],[3,1000]],6000)).to.throw();
        });
        
    });
});
