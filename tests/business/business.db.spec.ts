// import { expect } from "chai";
// import { createBusinessAccount,getBusinessAccountById,extractBusinessFromObj } from "../../src/business/business.db.js";
// import {connectDb} from "../../src/db/sql/sql.connection.js"

// before(async()=>{
//    await connectDb()
// })

// describe("business db functions ", () => {
//     context("updateAccountStatus ", () => {
  
//         it("should be function", () => {
//             expect(updateAccountStatus).to.be.a("Function");
//         });
//         it("should return undefined if ok ", async () => {
//             const res = await updateAccountStatus(1,true);
//             expect(res).to.be.undefined
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>updateAccountStatus(2000,1000)).to.throw();
//         // });
//     });

//     // context("updateAccountBalance ", () => {
  
//     //     it("should be function", () => {
//     //         expect(updateAccountBalance).to.be.a("Function");
//     //     });
//     //     it("should return undefined if ok ", () => {
//     //         expect(updateAccountBalance(7,1234567)).to.be.undefined
//     //     });
//     //     it("should throw error if not ok ", () => {
//     //         expect(()=>updateAccountBalance(7,1234)).to.throw();
//     //     });
//     // });

//     // context("getAccountsById ", () => {
  
//     //     it("should be function", () => {
//     //         expect(getAccountsById).to.be.a("Function");
//     //     });
//     //     it("should return undefined if ok ", () => {
//     //         expect(getAccountsById(1000)).to.be.undefined
//     //     });
//     //     it("should throw error if not ok ", () => {
//     //         expect(()=>getAccountsById(-1000)).to.throw();
//     //     });
//     //     it("should throw error if not ok ", () => {
//     //         expect(()=>getAccountsById(0)).to.throw();
//     //     });
//     // });

// });
