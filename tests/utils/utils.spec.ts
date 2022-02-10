import { expect } from "chai";
import { convertCurrency } from "../../src/utils/utils.js";


describe("utils   functions ", () => {
    context("convertCurrency ", () => {
  
        it("should be function", () => {
            expect(convertCurrency).to.be.a("Function");
        });
        it("should return amount in new coin  ", async () => {
            const res = await convertCurrency("EUR","MXN",10);
            expect(res).to.not.be.NaN;
            //expect(()=>getBusinessAccountById(11)).to.throw("bal")
        });
       
    });


});
