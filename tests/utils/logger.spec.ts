import logger from "../../src/utils/logger.js";
import { expect } from "chai";



describe("utils  functions ", () => {
    


    context("logParams ", () => {
  
        it("should log params nicely into the log file",async () => {
            const name="dor";
            const age = 28;
            expect(await logger.params("some_function_name",{name,age})).to.be.undefined;
        });

    })

    context("logError ", () => {
  
        it("should log errors nicely into the log file",async () => {
            const err=new Error("error message");
            expect(await logger.error("some_function_name",err)).to.be.undefined;
        });

    })

    context("logReturn ", () => {
  
        it("should log return value nicely into the log file number",async () => {
            const returnValue=123;
            expect(await logger.funcRet("some_function_name",returnValue)).to.be.undefined;
        });

        it("should log return value nicely into the log file string",async () => {
            const returnValue="hello log!";
            expect(await logger.funcRet("some_function_name",returnValue)).to.be.undefined;
        });

        it("should log return value nicely into the log file object",async () => {
            const returnValue={
                name:"dor",
                age:28
            };
            expect(await logger.funcRet("some_function_name",returnValue)).to.be.undefined;
        });

    })

});