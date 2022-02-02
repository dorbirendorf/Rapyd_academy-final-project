
import { expect } from "chai";
import { sayHello } from "../src/index";


describe("some text", () => {
    context("hello", () => {
        
        it("should say hello", () => {
            expect(sayHello).to.be.a("Function");
        });
    });
});
