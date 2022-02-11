import { expect } from "chai";
import { getAllIndividualsAccountsById,createIndividualAccount,checkIfIndivdualExistByIndividualId,extractIndividualFromObj } from "../../src/individual/individual.db.js";
import {connectDb} from "../../src/db/sql/sql.connection.js"

before(async()=>{
   await connectDb()
})
describe("individual db functions ", async() => {
    context("getAllIndividualsAccountsById ", () => {
  
        it("should be function", () => {
            expect(getAllIndividualsAccountsById).to.be.a("Function");
        });
        it("should return undefined if ok ", async () => {
            const res = await getAllIndividualsAccountsById([2,4,6]);
            console.log(res)
            expect(res.length).to.be.eqls(3)
        });
        // it("should throw error if not ok ", async () => {
        //  expect(async ()=> await getAllIndividualsAccountsById([2,4,1232])).to.throw();
        // });
    });

    context("createIndividualAccount ", () => {
  
        it("should be function", () => {
            expect(createIndividualAccount).to.be.a("Function");
        });
        it("should return account_id if ok ", async() => {
            const account_id = await createIndividualAccount({
                "first_name":"dor",
                "last_name":"birendorf",
                "currency":"usd",
                "balance":2000,
                "individual_id":7894561,
                "agent_id":1,
                "address_id":null
            
            });
            expect(account_id).to.be.eql(46);
        // it("should throw error if not ok ", () => {
        //     expect(()=>createIndividualAccount(7,1234)).to.throw();
        // });
    });

    context("checkIfIndivdualExistByIndividualId ", () => {
  
        it("should be function", () => {
            expect(checkIfIndivdualExistByIndividualId).to.be.a("Function");
        });
        it("should return true if individual Id already exist ", async () => {
            const exist = await checkIfIndivdualExistByIndividualId(7894561)
            expect(exist).to.be.equal(true)
        });
        it("should return false if individual Id doesn't exist ", async () => {
            const exist = await checkIfIndivdualExistByIndividualId(9999999)
            expect(exist).to.be.equal(false)
        });
        // it("should throw error if not ok ", () => {
        //     expect(()=>getAccountsById(-1000)).to.throw();
        // });
        // it("should throw error if not ok ", () => {
        //     expect(()=>getAccountsById(0)).to.throw();
        // });
    });

    context("extractIndividualFromObj ", () => {
  
        it("should be function", () => {
            expect(extractIndividualFromObj).to.be.a("Function");
        });
        it("should return account_id if ok ", async() => {
            const individual = extractIndividualFromObj({account_id : 1,
                currency: "USA",  
                balance: 12,
                agent_id:2,
                status: true,
                type:"individual",
                individual_id:1,
                first_name: "Meir",
                last_name: "Shtarkman",
                email:"meir@gmail.com",
                address_id:2,
                country_name: "Spain",
                country_code: "es",
                postal_code: 1234,
                city: "Haifa",
                region: "Asia",
                street_name: "Hertzel",
                street_number: 12
            })
            expect(individual).to.be.eql({account_id : 1,
                currency: "USA",  
                balance: 12,
                agent_id:2,
                status: true,
                type:"individual",
                individual_id:1,
                first_name: "Meir",
                last_name: "Shtarkman",
                email:"meir@gmail.com",
                address:{address_id:2,
                country_name: "Spain",
                country_code: "es",
                postal_code: 1234,
                city: "Haifa",
                region: "Asia",
                street_name: "Hertzel",
                street_number: 12}
            })
        });
        // it("should throw error if not ok ", () => {
        //     expect(()=>createIndividualAccount(7,1234)).to.throw();
        // });
 
    });

    });
})
