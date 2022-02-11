import { expect } from "chai";
import { addIndividualsToFamilyAccount, closeFamilyAccount, createFamilyAccount, getFamilyAccountByIdFull, getFamilyAccountByIdShort, removeIndividualsFromFamilyAccount, } from "../../src/family/family.services.js";


describe("family service functions ", () => {
    context("createFamilyAccount ", () => {
        it("should be function", () => {
            expect(createFamilyAccount).to.be.a("Function");
        });
        //should : check the implementation
    });

    context("getFamilyAccountByIdShort ", () => {
        it("should be function", () => {
            expect(getFamilyAccountByIdShort).to.be.a("Function");
        });
                //should : check the implementation
    });

    context("getFamilyAccountByIdFull ", () => {
        it("should be function", () => {
            expect(getFamilyAccountByIdFull).to.be.a("Function");
        });
                //should : check the implementation
    });
    context("closeFamilyAccount ", () => {
        it("should be function", () => {
            expect(closeFamilyAccount).to.be.a("Function");
        });
                //should : check the implementation
    });
    context("addIndividualsToFamilyAccount ", () => {
        it("should be function", () => {
            expect(addIndividualsToFamilyAccount).to.be.a("Function");
        });
                //should : check the implementation
    });
    context("addIndividualsToFamilyAccount ", () => {
        it("should be function", () => {
            expect(addIndividualsToFamilyAccount).to.be.a("Function");
        });
                //should : check the implementation
    });
    context("removeIndividualsFromFamilyAccount ", () => {
        it("should be function", () => {
            expect(removeIndividualsFromFamilyAccount).to.be.a("Function");
        });
                //should : check the implementation
    });
});


