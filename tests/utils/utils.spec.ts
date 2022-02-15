import { expect } from "chai";
import utils from "../../src/utils/utils.js";
import crypto from "crypto";
import sinon from "sinon";



describe("utils  functions ", () => {
    afterEach(()=>sinon.restore())
    context("createsignature ", () => {
        const req =  {
            first_name:"dor",
            last_name:"birendorf",
            currency:"usd",
            individual_id:1234567
        }
        it("should be function", () => {
            expect(utils.createsignature).to.be.a("Function");
        });

        it("should generate signature with time ", async () => {
            const res = await utils.createsignature(req,"bla",Date.now().toString());
            expect(res).to.be.string;
        });

        it("should generate signature without time ", async () => {
            const res = await utils.createsignature(req,"bla",Date.now().toString());
            expect(res).to.be.string;
        });
       
    });
     context("generateID ",  () => {
         const res = utils.generateID();
        it("should be function", () => {expect(utils.generateID).to.be.a("Function");});
        it("should generate ID", async () => {
            expect(res).to.be.string;
        });    
    });
    context("convertTupelsToArray ", () => {
        it("should be function", () => {
            expect(utils.convertTupelsToArray).to.be.a("Function");
        });
        it("should create an array from tupel", async () => {
            const res = utils.convertTupelsToArray([[1,2],[2,2]]);
            expect(res).to.eql([1, 2])});   
             
    });
    context("getTimeString ", () => {
        it("should be function", () => {
            expect(utils.getTimeString).to.be.a("Function");
        });
        it("should return time string ", async () => {
            const res = await utils.getTimeString();
            expect(res).to.be.string;
        });       
    });
});

 context("getRate ", () => {
        it("should be function", () => {
            expect(utils.getRate).to.be.a("Function");
        });      
    });

