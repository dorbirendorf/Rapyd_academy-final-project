// import { expect } from "chai";
// import {getAccountsById } from "../../src/account/account.db.js";
// import {connectDb} from "../../src/db/sql/sql.connection.js"

// before(async()=>{
//    await connectDb()
// })
// describe("account db functions ", () => {
//     context("updateAccountStatus ", () => {
  
//         it("should be function", () => {
//             expect(updateAccountStatus).to.be.a("Function");
//         });
//         it("should return undefined if ok ", async () => {
        
//             const res = await updateAccountStatus([2,4,6],true);
//             expect(res).to.be.eqls({fieldCount: 0,
//                 affectedRows: 3,
//                 insertId: 0,
//                 info: 'Rows matched: 3  Changed: 0  Warnings: 0',
//                 serverStatus: 2,
//                 warningStatus: 0,
//                 changedRows: 0}
//               )
//         });
//         // it("should throw error if not ok ", () => {
//         //     expect(()=>updateAccountStatus(2000,1000)).to.throw();
//         // });
//     });

    // context("updateAccountBalance ", () => {
  
    //     it("should be function", () => {
    //         expect(updateAccountBalance).to.be.a("Function");
    //     });
        // it("should return undefined if ok ", async() => {
        //     const res = await updateAccountBalance([[1,20000],[2,20000],[3,20000],[4,20000],[5,20000]]);
        //     expect(res).to.be.eql({fieldCount: 0,
        //         affectedRows: 5,
        //         insertId: 0,
        //         info: 'Rows matched: 5  Changed: 5  Warnings: 0',
        //         serverStatus: 2,
        //         warningStatus: 0,
        //         changedRows: 5})
        // });
        // it("should throw error if not ok ", () => {
        //     expect(()=>updateAccountBalance(7,1234)).to.throw();
        // });
    // });

    context("getAccountsById ", () => {
  
        it("should be function", () => {
            expect(getAccountsById).to.be.a("Function");
        });
        it("should return undefined if ok ", async () => {
            const accounts = await getAccountsById([1,2,3,4,5])
            console.log(accounts);
            expect(accounts.length).to.be.equal(5)
        });
        // it("should throw error if not ok ", () => {
        //     expect(()=>getAccountsById(-1000)).to.throw();
        // });
        // it("should throw error if not ok ", () => {
        //     expect(()=>getAccountsById(0)).to.throw();
        // });
    });

});
