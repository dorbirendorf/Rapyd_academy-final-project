// import { expect } from "chai";
// import BusinessService from "../../src/business/business.services.js";
// import { IBusiness } from "../../src/types/types.js";
// import sinon from "sinon";
// import * as DB_BUSINESS from "../../src/business/business.db.js"



// describe("#getBusinessAccountById", () => {

//     const businesses:IBusiness[] = [{"account_id": 24,
//     "currency": "USD",
//     "agent_id": 2,
//     "balance": 599432,
//     "status": 1,
//     "type": "business",
//     "company_id": 12345678,
//     "company_name": "Dearman Inc",
//     "context": "treasury",
//     "address": {
//         "address_id": 2,
//         "country_name": "Israel",
//         "country_code": "IL",
//         "postal_code": 12345,
//         "city": "Haifa",
//         "region": "North",
//         "street_name": "Hertzel",
//         "street_number": 12
//     }
// }]


//     context("throwing error when getAllBusinessAccountById return empty array", () => {
//         const db = sinon.mock(DB_BUSINESS);
//         db.expects("getAllBusinessAccountById").resolves([])
//         it("should be function", () => {
//             expect(BusinessService.getBusinessAccountById("1")).to.be.eql(businesses);
//         });
       
       
//     });


//     });
