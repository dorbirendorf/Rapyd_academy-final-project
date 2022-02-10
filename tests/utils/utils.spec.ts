import { expect } from "chai";
import { convertCurrency ,createSignture} from "../../src/utils/utils.js";
import crypto from "crypto";



describe("utils   functions ", () => {
    // context("convertCurrency ", () => {
  
    //     it("should be function", () => {
    //         expect(convertCurrency).to.be.a("Function");
    //     });
    //     it("should return amount in new coin  ", async () => {
    //         const res = await convertCurrency("EUR","MXN",10);
    //         expect(res).to.not.be.NaN;
    //     });
       
    // });


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

            const { privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
              });
            const res = await createSignture(req,privateKey,Date.now());
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

            const { privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
              });
            const res = await createSignture(req,privateKey);
            expect(res).to.be.string;
            

        });
       
    });


});
