import { expect } from "chai";
import {  getAllFamilyMembers,getFamilyAccountByIdFull,getAllFamilyMembersId,getFamilyAccountByIdShort} from "../../src/family/family.db.js";
import {connectDb} from "../../src/db/sql/sql.connection.js"

before(async()=>{
   await connectDb()
})
describe("family db functions ", () => {
    context("getFamilyAccountByIdFull ", () => {
  
        it("should be function", () => {
            expect(getFamilyAccountByIdFull).to.be.a("Function");
        });
        it("should return undefined if ok ", async () => {
            const res = await getFamilyAccountByIdFull(42);
            console.log(res.owners)
            expect(res).to.be.eqls(3)
        });
        // it("should throw error if not ok ", () => {
        //     expect(()=>updateAccountStatus(2000,1000)).to.throw();
        // });
    });

});    