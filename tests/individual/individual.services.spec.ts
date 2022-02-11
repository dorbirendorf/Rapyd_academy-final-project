import { expect } from "chai";
import {createIndividualAccount,getIndividualByAccountId,getIndividualByIndividualId} from "../../src/individual/individual.services.js";


describe("individual service functions ", () => {
    context("createIndividualAccount ", () => {
        it("should be function", () => {
            expect(createIndividualAccount).to.be.a("Function");
        });
        //should : check the implementation
    });

    context("getIndividualByAccountId ", () => {
        it("should be function", () => {
            expect(getIndividualByAccountId).to.be.a("Function");
        });
                //should : check the implementation
    });

    context("getIndividualByIndividualId ", () => {
        it("should be function", () => {
            expect(getIndividualByIndividualId).to.be.a("Function");
        });
                //should : check the implementation
    });
});






  