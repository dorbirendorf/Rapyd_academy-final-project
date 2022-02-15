// import { expect } from "chai";
// import {  getAllFamilyMembers,getFamilyAccountByIdFull,getAllFamilyMembersId,getFamilyAccountByIdShort,addIndividualsToFamilyAccount,extractFamilyFromObj,removeIndividualsFromFamilyAccount,createFamilyAccount} from "../../src/family/family.db.js";
// import {connectDb} from "../../src/db/sql/sql.connection.js"


// // describe("family db functions ", () => {
// //     context("getFamilyAccountByIdFull ", () => {
  
// //         it("should be function", () => {
// //             expect(getFamilyAccountByIdFull).to.be.a("Function");
// //         });
// //         it("should return family object if ok ", async () => {
// //             const res = await getFamilyAccountByIdFull(42);
// //             expect(res).to.be.eqls({
// //                 "account_id": 42,
// //                 "currency": "EUR",
// //                 "balance": 8000,
// //                 "agent_id": 1,
// //                 "status": 1,
// //                 "type": "family",
// //                 "context": "travel",
// //                 "owners": [
// //                     {
// //                         "account_id": 8,
// //                         "agent_id": 1,
// //                         "currency": "EUR",
// //                         "balance": 5000,
// //                         "status": 1,
// //                         "type": "individual",
// //                         "individual_id": 8,
// //                         "first_name": "Sargant",
// //                         "last_name": "Mitzi",
// //                         "email": "Sargant@gmail.com",
// //                         "address": {
// //                             "address_id": 2,
// //                             "country_name": "Israel",
// //                             "country_code": "IL",
// //                             "postal_code": 12345,
// //                             "city": "Haifa",
// //                             "region": "North",
// //                             "street_name": "Hertzel",
// //                             "street_number": 12
// //                         }
// //                     },
// //                     {
// //                         "account_id": 6,
// //                         "agent_id": 1,
// //                         "currency": "EUR",
// //                         "balance": 60000,
// //                         "status": 1,
// //                         "type": "individual",
// //                         "individual_id": 6,
// //                         "first_name": "Daisi",
// //                         "last_name": "Nelia",
// //                         "email": "Daisi@gmail.com",
// //                         "address": {
// //                             "address_id": 3,
// //                             "country_name": "Spain",
// //                             "country_code": "ES",
// //                             "postal_code": 12345,
// //                             "city": "Madrid",
// //                             "region": null,
// //                             "street_name": null,
// //                             "street_number": 124
// //                         }
// //                     },
// //                     {
// //                         "account_id": 4,
// //                         "agent_id": 1,
// //                         "currency": "USD",
// //                         "balance": 20000,
// //                         "status": 1,
// //                         "type": "individual",
// //                         "individual_id": 4,
// //                         "first_name": "Curragh",
// //                         "last_name": "Fulton",
// //                         "email": "Curragh@gmail.com",
// //                         "address": {
// //                             "address_id": 1,
// //                             "country_name": "Israel",
// //                             "country_code": "IL",
// //                             "postal_code": 12345,
// //                             "city": "Tel-Aviv",
// //                             "region": "Central",
// //                             "street_name": "Dizingof",
// //                             "street_number": 22
// //                         }
// //                     },
// //                     {
// //                         "account_id": 2,
// //                         "agent_id": 1,
// //                         "currency": "USD",
// //                         "balance": 20000,
// //                         "status": 1,
// //                         "type": "individual",
// //                         "individual_id": 2,
// //                         "first_name": "Haim",
// //                         "last_name": "Daisi",
// //                         "email": "Haim@gmail.com",
// //                         "address": {
// //                             "address_id": 2,
// //                             "country_name": "Israel",
// //                             "country_code": "IL",
// //                             "postal_code": 12345,
// //                             "city": "Haifa",
// //                             "region": "North",
// //                             "street_name": "Hertzel",
// //                             "street_number": 12
// //                         }
// //                     }
// //                 ]
// //             })
// //         });
// //         // it("should throw error if not ok ", () => {
// //         //     expect(()=>updateAccountStatus(2000,1000)).to.throw();
// //         // });
// //     });

// //     context("getAllFamilyMembers ", () => {
  
// //         it("should be function", () => {
// //             expect(getAllFamilyMembers).to.be.a("Function");
// //         });
// //         it("should return Individual array ", async () => {
// //             const individuals = await getAllFamilyMembers(42)
// //             expect(individuals).to.be.eql([
// //                 {
// //                     "account_id": 8,
// //                     "agent_id": 1,
// //                     "currency": "EUR",
// //                     "balance": 5000,
// //                     "status": 1,
// //                     "type": "individual",
// //                     "individual_id": 8,
// //                     "first_name": "Sargant",
// //                     "last_name": "Mitzi",
// //                     "email": "Sargant@gmail.com",
// //                     "address": {
// //                         "address_id": 2,
// //                         "country_name": "Israel",
// //                         "country_code": "IL",
// //                         "postal_code": 12345,
// //                         "city": "Haifa",
// //                         "region": "North",
// //                         "street_name": "Hertzel",
// //                         "street_number": 12
// //                     }
// //                 },
// //                 {
// //                     "account_id": 6,
// //                     "agent_id": 1,
// //                     "currency": "EUR",
// //                     "balance": 60000,
// //                     "status": 1,
// //                     "type": "individual",
// //                     "individual_id": 6,
// //                     "first_name": "Daisi",
// //                     "last_name": "Nelia",
// //                     "email": "Daisi@gmail.com",
// //                     "address": {
// //                         "address_id": 3,
// //                         "country_name": "Spain",
// //                         "country_code": "ES",
// //                         "postal_code": 12345,
// //                         "city": "Madrid",
// //                         "region": null,
// //                         "street_name": null,
// //                         "street_number": 124
// //                     }
// //                 },
// //                 {
// //                     "account_id": 4,
// //                     "agent_id": 1,
// //                     "currency": "USD",
// //                     "balance": 20000,
// //                     "status": 1,
// //                     "type": "individual",
// //                     "individual_id": 4,
// //                     "first_name": "Curragh",
// //                     "last_name": "Fulton",
// //                     "email": "Curragh@gmail.com",
// //                     "address": {
// //                         "address_id": 1,
// //                         "country_name": "Israel",
// //                         "country_code": "IL",
// //                         "postal_code": 12345,
// //                         "city": "Tel-Aviv",
// //                         "region": "Central",
// //                         "street_name": "Dizingof",
// //                         "street_number": 22
// //                     }
// //                 },
// //                 {
// //                     "account_id": 2,
// //                     "agent_id": 1,
// //                     "currency": "USD",
// //                     "balance": 20000,
// //                     "status": 1,
// //                     "type": "individual",
// //                     "individual_id": 2,
// //                     "first_name": "Haim",
// //                     "last_name": "Daisi",
// //                     "email": "Haim@gmail.com",
// //                     "address": {
// //                         "address_id": 2,
// //                         "country_name": "Israel",
// //                         "country_code": "IL",
// //                         "postal_code": 12345,
// //                         "city": "Haifa",
// //                         "region": "North",
// //                         "street_name": "Hertzel",
// //                         "street_number": 12
// //                     }
// //                 }
// //             ])
// //         });
// //         // it("should throw error if not ok ", () => {
// //         //     expect(()=>getAccountsById(-1000)).to.throw();
// //         // });
// //         // it("should throw error if not ok ", () => {
// //         //     expect(()=>getAccountsById(0)).to.throw();
// //         // 
// //     });

// //     context("getAllFamilyMembersId ", () => {
  
// //         it("should be function", () => {
// //             expect(getAllFamilyMembersId).to.be.a("Function");
// //         });
// //         it("should return get all idndividuals account if ok ", async () => {
// //             const res = await getAllFamilyMembersId(42);
// //             expect(res).to.be.eqls([
// //                 {
// //                     "account_id": 8
// //                 },
// //                 {
// //                     "account_id": 6
// //                 },
// //                 {
// //                     "account_id": 4
// //                 },
// //                 {
// //                     "account_id": 2
// //                 }
// //             ]);
// //         // it("should throw error if not ok ", async () => {
// //         //  expect(async ()=> await getAllIndividualsAccountsById([2,4,1232])).to.throw();
// //         // });
// //     });

// //     context("getFamilyAccountByIdShort ", () => {
  
// //         it("should be function", () => {
// //             expect(getFamilyAccountByIdShort).to.be.a("Function");
// //         });
// //         it("should return get all idndividuals account_ids if ok ", async () => {
// //             const res = await getFamilyAccountByIdShort(42);
// //             expect(res).to.be.eqls({
// //                 "account_id": 42,
// //                 "currency": "EUR",
// //                 "balance": 8000,
// //                 "agent_id": 1,
// //                 "status": 1,
// //                 "type": "family",
// //                 "context": "travel",
// //                 "owners_id": [
// //                     {
// //                         "account_id": 8
// //                     },
// //                     {
// //                         "account_id": 6
// //                     },
// //                     {
// //                         "account_id": 4
// //                     },
// //                     {
// //                         "account_id": 2
// //                     }
// //                 ]
// //             })
// //         });
// //         // it("should throw error if not ok ", async () => {
// //         //  expect(async ()=> await getAllIndividualsAccountsById([2,4,1232])).to.throw();
// //         // });
// //     });

// //     context("addIndividualsToFamilyAccount ", () => {
  
// //         it("should be function", () => {
// //             expect(addIndividualsToFamilyAccount).to.be.a("Function");
// //         });
// //         it("should return get all idndividuals account_ids if ok ", async () => {
// //             const res = await addIndividualsToFamilyAccount(49,[2,4]);
// //             expect(res).to.be.eqls(5)
// //         });
// //         // it("should throw error if not ok ", async () => {
// //         //  expect(async ()=> await getAllIndividualsAccountsById([2,4,1232])).to.throw();
// //         // });
// //     });

// // });    
// // });
