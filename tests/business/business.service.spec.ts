import { expect } from "chai";
import BusinessService from "../../src/business/business.services.js";
import { IBusiness } from "../../src/types/types.js";
import sinon from "sinon";
import DB_BUSINESS from "../../src/business/business.db.js"



describe("#createBusinessAccount", () => {
    afterEach(()=>sinon.restore())
    
    const accountForCreation = {
        balance: 5000,
        currency:"USD",
        company_id:12345678,
        company_name:"meir",
        agent_id:1,
        status:1,

    }
    
   
    context("success run", () => {
        it("should return one buisness account", async () => {
            sinon.stub(DB_BUSINESS, "createBusinessAccount").resolves(2);
            const actual = await BusinessService.createBusinessAccount(accountForCreation);
            expect(actual).to.deep.equal(2);
        });
    });


});

describe("#getBusinessAccountById", () => {
    afterEach(()=>sinon.restore())
    
    const businesses: IBusiness[] = [{
        "account_id": 24,
        "currency": "USD",
        "agent_id": 2,
        "balance": 599432,
        "status": 1,
        "type": "business",
        "company_id": 12345678,
        "company_name": "Dearman Inc",
        "context": "treasury",
        "address": {
            "address_id": 2,
            "country_name": "Israel",
            "country_code": "IL",
            "postal_code": 12345,
            "city": "Haifa",
            "region": "North",
            "street_name": "Hertzel",
            "street_number": 12
        }
    }]


    context("throwing error when getAllBusinessAccountById return empty array", () => {

        it("should throw error - Data not found", async () => {
            sinon.stub(DB_BUSINESS, "getAllBusinessAccountById").resolves([]);

            try {
                await BusinessService.getBusinessAccountById("1");
            } catch (error) {
                expect((error as Error).message).to.be.equal("Data not found");
            }

        });


    });

    context("throwing error when getAllBusinessAccountById return undifined", () => {

        it("should throw error - Data not found", async () => {
            sinon.stub(DB_BUSINESS, "getAllBusinessAccountById").resolves(undefined);

            try {
                await BusinessService.getBusinessAccountById("1");
            } catch (error) {
                expect((error as Error).message).to.be.equal("Data not found");
            }

        });


    });

    context("success run", () => {
        it("should return one buisness account", async () => {
            sinon.stub(DB_BUSINESS, "getAllBusinessAccountById").resolves(businesses);
            const actual = await BusinessService.getBusinessAccountById("24");
            expect(actual).to.deep.equal(businesses);
        });
    });


});
//createBusinessAccount