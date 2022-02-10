import { expect } from "chai";
import {  createSignture} from "../../src/utils/utils.js";
import crypto from "crypto";



describe("utils  functions ", () => {
    


    context("createSignture ", () => {
  
        it("should be function", () => {
            expect(createSignture).to.be.a("Function");
        });

        it("should generate signture with time ", async () => {
            const req = 
                {
                    first_name:"dor",
                    last_name:"birendorf",
                    currency:"usd",
                    individual_id:1234567
                }
            const res = await createSignture(req,"bla",Date.now());
            expect(res).to.be.string;
            

        });

        it("should generate signture without time ", async () => {
            const req = 
                {
                    first_name:"dor",
                    last_name:"birendorf",
                    currency:"usd",
                    individual_id:1234567
                }

            const res = await createSignture(req,"bla",Date.now());
            expect(res).to.be.string;
            

        });
       
    });


});
