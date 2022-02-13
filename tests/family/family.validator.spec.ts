// import { expect } from "chai";
// import { validateAddToFamily, validateFamilyModel, validateRemoveFromFamily, validateUpdateAccounts } from "../../src/family/family.validator.js";


// describe("family validadator functions ", () => {
//     let id1 = ()=>[{account_id:1,currency: "ILS",balance: 100000,status: true,type: "individual",individual_id: 6,first_name: "string",last_name: "string",agent_id:1}];
//     let family = {account_id:2,currency:"ILS",balance: 50000,status: true,type:"family", agent_id:1,
//     owners:[{account_id:1,currency: "ILS",balance: 100000,status: true,type: "individual",individual_id: 6,first_name: "string",last_name: "string",agent_id:1}]};
//     context("validateFamilyModel", () => {
  
//         it("should be function", () => {
//             expect(validateFamilyModel).to.be.a("Function");
//         });
//         //should : check the implementation
//     });
//     context("validateUpdateAccounts", () => {
  
//         it("should be function", () => {
//             expect(validateUpdateAccounts).to.be.a("Function");
//         });
//         //should : check the implementation
//     });
//     context("validateUpdateAccounts", () => {
  
//         it("should be function", () => {
//             expect(validateAddToFamily).to.be.a("Function");
//         });
//         //should : check the implementation
//     });

//     context("validateAddToFamily", () => {
//         it("should be function", () => {
//             expect(validateAddToFamily).to.be.a("Function");
//         });         
//         it("should return true if validate add to family passed", () => {
//             expect( validateAddToFamily(id1(),[[1,20]],"ILS")).to.be.undefined;
//         });
//         it("should return true if validate add to family failed", () => {
//             expect(()=>validateAddToFamily(id1(),[[1,20]],"EUR")).to.throw();
//         });
// });

// context("validateRemoveFromFamily", () => {
//     it("should be function", () => {
//         expect(validateRemoveFromFamily).to.be.a("Function");
//     });         
//     it("should return true if validate remove from family passed", () => {
//         expect(validateRemoveFromFamily(id1(),[[1,20]],family)).to.be.undefined;
//     });
//     it("should return true if validate remove from family failed", () => {
//         expect(()=>validateRemoveFromFamily(id1(),[[2,30]],family)).to.throw();
//     });
//  });
// });

