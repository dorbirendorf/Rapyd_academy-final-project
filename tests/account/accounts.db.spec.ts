// import { expect } from "chai";
// import { updateAccountsStatus,updateAccountsBalance,getAccountsById,createAccount,createAddress,getSecretKeyByAccessKey} from "../../src/account/account.db.js";
// import {connectDb} from "../../src/db/sql/sql.connection.js"

// before(async()=>{
//    await connectDb()
// })
// describe("account db functions ", () => {
//     context("updateAccountsStatus ", () => {
  
//         it("should be function", () => {
//             expect(updateAccountsStatus).to.be.a("Function");
//         });
//         it("should return OkPacket if ok", async () => {
//             const res = await updateAccountsStatus([2,4,6],true);
//             expect(res).to.be.eqls({fieldCount: 0,
//                 affectedRows: 3,
//                 insertId: 0,
//                 info: 'Rows matched: 3  Changed: 0  Warnings: 0',
//                 serverStatus: 2,
//                 warningStatus: 0,
//                 changedRows: 0}
//               )
//         });
    
//     });

//    context("updateAccountsBalance ", () => {
  
//         it("should be function", () => {
//             expect(updateAccountsBalance).to.be.a("Function");
//         });
//         it("should return OkPacket if ok ", async() => {
//             const res = await updateAccountsBalance([[1,20000],[2,20000],[3,20000],[4,20000],[5,20000]]);
//             expect(res).to.be.eql({fieldCount: 0,
//                 affectedRows: 5,
//                 insertId: 0,
//                 info: 'Rows matched: 5  Changed: 5  Warnings: 0',
//                 serverStatus: 2,
//                 warningStatus: 0,
//                 changedRows: 5})
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>updateAccountsBalance(7,1234)).to.throw();
//         // });
//     });

//    context("getAccountsById ", () => {
  
//         it("should be function", () => {
//             expect(getAccountsById).to.be.a("Function");
//         });
//         it("should return the account_id if ok ", async () => {
//             const accounts = await getAccountsById([1,2])
//             console.log(accounts);
//             expect(accounts.length).to.be.equal(2)
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(-1000)).to.throw();
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(0)).to.throw();
//         // });
//     });

//     context("createAccount ", () => {
  
//         it("should be function", () => {
//             expect(createAccount).to.be.a("Function");
//         });
//         it("should return number of account_id if ok ", async () => {
//             const accounts = await createAccount({balance:2000,currency:"USD",agent_id:1,type:"individual",status:true},"individual")
//             console.log(accounts);
//             expect(accounts).to.be.equal(45)
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(-1000)).to.throw();
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(0)).to.throw();
//         // });
//     });

//     context("createAddress ", () => {
  
//         it("should be function", () => {
//             expect(createAddress).to.be.a("Function");
//         });
//         it("should return the number of address_id if ok ", async () => {
//             const accounts = await createAddress({street_number:2000,street_name:"AAAA",country_code:"US",country_name:"USA",region:"America",postal_code:14141,city:"California"})
      
//             expect(accounts).to.be.equal(5)
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(-1000)).to.throw();
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(0)).to.throw();
//         // });
//     });

//     context("getSecretKeyByAccessKey ", () => {
  
//         it("should be function", () => {
//             expect(getSecretKeyByAccessKey).to.be.a("Function");
//         });
//         it("should return secret_key if ok ", async () => {
//             const secret_key = await getSecretKeyByAccessKey("lkdj23iojd320")
      
//             expect(secret_key).to.be.equal("d2ldkk023d32d3o2jdi32j9983j2d9sd32d2d2f9")
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(-1000)).to.throw();
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(0)).to.throw();
//         // });
//     });

// });
