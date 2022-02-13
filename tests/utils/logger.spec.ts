// import logger from "../../src/utils/logger.js";
// import { expect } from "chai";



// describe("utils  functions ", () => {
    


//     context("logParams ", () => {
  
//         it("should log params nicely into the log file", () => {
//             const name="dor";
//             const age = 28;
//             expect(logger.params("some_function_name",{name,age})).to.be.undefined;
//         });

//     })

//     context("logError ", () => {
  
//         it("should log errors nicely into the log file", () => {
//             const err=new Error("error message");
//             expect( logger.error("some_function_name",err)).to.be.undefined;
//         });

//     })

//     context("logReturn ", () => {

//         const function_name="some name"
//         const numberReturnValue=123
//         const stringReturnValue="hello log!";
//         const objReturnValue={
//             name:"Dor",
//             age:28
//         };

//         it("should log return value nicely into the log file number", () => {
//             const ret_number =  logger.funcRet(function_name,numberReturnValue);
            
//             expect(ret_number).to.be.undefined;
//         });

//         it("should log return value nicely into the log file string", () => {
//             const ret_string =  logger.funcRet(function_name,stringReturnValue);
            
//             expect(ret_string).to.be.undefined;
//         });

//         it("should log return value nicely into the log file object", () => {
//             const ret_obj =  logger.funcRet(function_name,objReturnValue);

//             expect(ret_obj).to.be.undefined;
//         });

//     })

// });