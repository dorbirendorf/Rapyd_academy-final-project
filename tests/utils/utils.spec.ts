import { expect } from "chai";
import {  convertTupelsToArray, createsignature, generateID, getTimeString} from "../../src/utils/utils.js";
import crypto from "crypto";



describe("utils  functions ", () => {
    


    context("createsignature ", () => {
  
        it("should be function", () => {
            expect(createsignature).to.be.a("Function");
        });

        it("should generate signature with time ", async () => {
            const req = 
                {
                    first_name:"dor",
                    last_name:"birendorf",
                    currency:"usd",
                    individual_id:1234567
                }
            const res = await createsignature(req,"bla",Date.now().toString());
            expect(res).to.be.string;
        });

        it("should generate signature without time ", async () => {
            const req = 
                {
                    first_name:"dor",
                    last_name:"birendorf",
                    currency:"usd",
                    individual_id:1234567
                }

            const res = await createsignature(req,"bla",Date.now().toString());
            expect(res).to.be.string;
        });
       
    });
     context("generateID ", () => {
        it("should be function", () => {
            expect(generateID).to.be.a("Function");
        });
        it("should generate ID", async () => {
            const res = await generateID();
            expect(res).to.be.string;
        });    
    });
    context("convertTupelsToArray ", () => {
        it("should be function", () => {
            expect(convertTupelsToArray).to.be.a("Function");
        });
        it("should create an array from tupel", async () => {
            const res = convertTupelsToArray([[1,2],[2,2]]);
            expect(res).to.eql([1, 2])});   
             
    });
    context("getTimeString ", () => {
        it("should be function", () => {
            expect(getTimeString).to.be.a("Function");
        });
        it("should return time string ", async () => {
            const res = await getTimeString();
            expect(res).to.be.string;
        });       
    });
});

 // context("getRate ", () => {
    //     it("should be function", () => {
    //         expect(getRate).to.be.a("Function");
    //     });
    //     it("should return rate from base to currency ", async () => {
    //         const res = await getRate("ILS","EUR");
    //         expect(res).to.equal(3232);
    //     });       
    // });

//should: - check getRate