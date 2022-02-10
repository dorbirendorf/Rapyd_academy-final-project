/* eslint-disable @typescript-eslint/no-unused-vars */
import { ACCOUNT_BALLANCE_LOW, INVALID_FILED_VALUE } from "../types/constants.js";
import { Request, Response, NextFunction} from "express";

export function validIndividualId(id_length:number,id:number):void{
    if(String(id).length !== id_length) {
      throw new Error(`${INVALID_FILED_VALUE} - individual id not valid`);    }
}

export function checkBalance(minimalBalance:number,balance:number):void{
   if (balance<minimalBalance){
      throw new Error(ACCOUNT_BALLANCE_LOW);
   }
}

export function amountPositive(amount:number):void{
   if(typeof amount !== "number"|| amount<=0){
      throw new Error(`${INVALID_FILED_VALUE} - msg.. `)
   }
}


export function sumFamilyAmounts(tupels:[number,number][],minBalance:number):number{
   const sum:number = tupels.reduce((prev,tupel)=>tupel[1]+ prev,0);
   if (sum<minBalance){
        throw new Error(`${ACCOUNT_BALLANCE_LOW} - sum of all amount is to low`)
   }
   return sum;
}


export function initRequiredParams() : Map<string, string[]> {
   const requiredParams = new Map<string, string[]>();
   requiredParams.set('individual', ['individual_id', 'first_name', 'last_name', 'currency']);
   requiredParams.set('business', ['compay_id', 'company_name', 'currency']);
   requiredParams.set('family', ['owners', 'currency']);
   return requiredParams;
 }
 export function validateAccountId(req:Request,res:Response,next:NextFunction):void {
   const {id} = req.params;
   
   if((id === "undefined")||(isNaN(Number(id)))){
      throw new Error(`${INVALID_FILED_VALUE} - id isnt accept`)
   }
}
 