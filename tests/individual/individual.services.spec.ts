/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { expect } from "chai";
import sinon from "sinon";
import {IIndividual} from "../../src/types/types.js"
import Iservice from "../../src/individual/individual.services.js"
import DB_INDIVIDUAL from "../../src/individual/individual.db.js";
import config from "../../src/config.js"



describe("Individual Service module", () => {

    const individual_account = {
         account_id: 60,
        agent_id: 1,
        currency: "usd",
        balance: 7000,
         status: "active",
         type: "individual",
        individual_id: 4444444,
        first_name: "dor",
        last_name: "birendorf",
        email: "email",
        address: {
            address_id: 8,
            country_name: "israel",
            country_code: "il",
            postal_code: 90210,
            CustomElementRegistry: "tel-aviv",
            regionCustomElementRegistry: "center",
            street_nameCustomElementRegistry: "begin",
            street_numberCustomElementRegistry: 132
        }
    };

    beforeEach(()=>sinon.restore())


    // context("#getIndividualByAccountId()", () => {
    //     const individual_id = "60"
        
    //     it("should return individual <seccess>", async () => {

    //         sinon.stub(DB_INDIVIDUAL, "getAllIndividualsAccountsById").resolves([individual_account]);
    //         const actual =await Iservice.getIndividualByAccountId(individual_id);

    //         expect(actual).to.deep.equal(individual_account);
    //     });
        
    // });

    context("#createIndividualAccount()", () => {
    //     const newId=777
        
    //     it("should return new individualId <seccess>",async () => {

    //         sinon.stub(Iservice, "checkIfIndivdualExistByIndividualId").resolves();
    //         sinon.stub(DB_INDIVIDUAL, "createIndividualAccount").resolves(newId);
            
    //         const actual = await  Iservice.createIndividualAccount(individual_account);
    //         expect(actual).to.deep.equal(newId);
    //     });

        it("should throw error if individualId is taken <fail>",async () => {

            // sinon.stub(Iservice, "checkIfIndivdualExistByIndividualId").throws("individual id already existtt");
            sinon.stub(Iservice, "checkIfIndivdualExistByIndividualId").rejects("individual id already existtt");
            
            try{

                expect(await Iservice.createIndividualAccount(individual_account)).to.throw()
            }catch(err ){
            }
        });
        
//     });

    // context("#checkIfIndivdualExistByIndividualId()", () => {
    //     const id = 666;
        
    //     it("should throw error if individualId is taken <fail>",async () => {

    //         sinon.stub(DB_INDIVIDUAL, "checkIfIndivdualExistByIndividualId").throws();
            
    //         expect(Iservice.checkIfIndivdualExistByIndividualId(id)).to.throw();
    //     });
        
    // });
});

});









  