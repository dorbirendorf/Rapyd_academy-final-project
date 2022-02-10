import { expect } from "chai";
import { getAllIndividualsAccountsById,createIndividualAccount,checkIfIndivdualExistByIndividualId,extractIndividualFromObj } from "../../src/individual/individual.db.js";
import {connectDb} from "../../src/db/sql/sql.connection.js"

before(async()=>{
   await connectDb()
})
describe("individual db functions ", () => {
    context("getAllIndividualsAccountsById ", () => {
  
        it("should be function", () => {
            expect(getAllIndividualsAccountsById).to.be.a("Function");
        });
        it("should return undefined if ok ", async () => {
            const res = await getAllIndividualsAccountsById([2,4,6]);
            console.log(res)
            expect(res.length).to.be.eqls(3)
        });
        // it("should throw error if not ok ", () => {
        //     expect(()=>updateAccountStatus(2000,1000)).to.throw();
        // });
    });

//     // context("updateAccountBalance ", () => {
  
//     //     it("should be function", () => {
//     //         expect(updateAccountBalance).to.be.a("Function");
//     //     });
//         // it("should return undefined if ok ", async() => {
//         //     const res = await updateAccountBalance([[1,20000],[2,20000],[3,20000],[4,20000],[5,20000]]);
//         //     expect(res).to.be.eql({fieldCount: 0,
//         //         affectedRows: 5,
//         //         insertId: 0,
//         //         info: 'Rows matched: 5  Changed: 5  Warnings: 0',
//         //         serverStatus: 2,
//         //         warningStatus: 0,
//         //         changedRows: 5})
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>updateAccountBalance(7,1234)).to.throw();
//         // });
//     // });

//     // context("getAccountsById ", () => {
  
//     //     it("should be function", () => {
//     //         expect(getAccountsById).to.be.a("Function");
//     //     });
//     //     it("should return undefined if ok ", async () => {
//     //         const accounts = await getAccountsById([1,2,3,4,5])
//     //         console.log(accounts);
//     //         expect(accounts.length).to.be.equal(5)
//     //     });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(-1000)).to.throw();
//         // });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>getAccountsById(0)).to.throw();
//         // });
//     // });

// });
