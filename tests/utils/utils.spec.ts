import { expect } from "chai";
import {  createsignature} from "../../src/utils/utils.js";
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


});
