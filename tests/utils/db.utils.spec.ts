// import { expect } from "chai";
// import DbHandler from "../../src/db.utils.js"

// describe("DbHandler functions ", () => {

//     describe("#convertArrayOfArraysToMergedArray", () => {

//         context("when the function recieve right input", () => {
//             const input = [["a","b","c"],["d","e","f"],["g","h","i"],["j","k","l"]]
//             it("should be function", () => {
//                 expect(DbHandler.convertArrayOfArraysToMergedArray(input)).to.be.a("Function");
//             });

//             it("should generate signature with time ", async () => {
//                 const res = await createsignature(req, "bla", Date.now().toString());
//                 expect(res).to.be.string;
//             });

//             it("should generate signature without time ", async () => {
//                 const res = await createsignature(req, "bla", Date.now().toString());
//                 expect(res).to.be.string;
//             });

//         });
//         context("generateID ", () => {
//             const res = generateID();
//             it("should be function", () => { expect(generateID).to.be.a("Function"); });
//             it("should generate ID", async () => {
//                 expect(res).to.be.string;
//             });
//         });
//         context("convertTupelsToArray ", () => {
//             it("should be function", () => {
//                 expect(convertTupelsToArray).to.be.a("Function");
//             });
//             it("should create an array from tupel", async () => {
//                 const res = convertTupelsToArray([[1, 2], [2, 2]]);
//                 expect(res).to.eql([1, 2])
//             });

//         });
//         context("getTimeString ", () => {
//             it("should be function", () => {
//                 expect(getTimeString).to.be.a("Function");
//             });
//             it("should return time string ", async () => {
//                 const res = await getTimeString();
//                 expect(res).to.be.string;
//             });
//         });
//     });
// });