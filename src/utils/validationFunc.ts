import raw from "../middleware/route.async.wrapper.js";
import { NextFunction, Response, Request } from "express";
import ValidatorFactoty from "../types/validation.js"

// export const isvalid = raw(
//     (req: Request, res: Response, next: NextFunction) => {
//     const {type} = req.bodyl; //to get type of validator to create (b2b,b2c,Facountt ,etc.. ) 
//     const validator = ValidatorFactory(req.body.type);
//     validator.validate();
//     next()
//     })
   
// check existent of Mandatory fields
export function fieldExist(str:string):boolean{
   return str!=="undefined" && str!==null;
}
//check len,and num id
export function checkDigit(number:number,digits:number,id:string):boolean{
    return id!=="undefined" && digits === id.length && Number(id)>number; 
}
//check balance for transfer
export function checkBalance(minimalBalance:number,balance:number):boolean{
   return balance>=minimalBalance;
}

export function sumAmount(tupels:[number,number][],balance:number):boolean{
   const sum:number = tupels.reduce((prev,tupel)=>tupel[1]+ prev,0);
   if (sum<balance){
        throw new Error("Account ballance too low - msg.. ")
   }
   return true;
}

//individual:
// If the primaryID is provided, an error should be returned
//There can be only one