import { ACCOUNT_BALLANCE_LOW, INVALID_FILED_VALUE } from "../types/constants.js";


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
   if(typeof amount !== "number"|| (amount)<0){
      throw new Error(`${INVALID_FILED_VALUE} - msg.. `)
   }
}


//[account_id,amount]
export function sumFamilyAmounts(tupels:[number,number][],minBalance:number):void{
   const sum:number = tupels.reduce((prev,tupel)=>tupel[1]+ prev,0);
   if (sum<minBalance){
        throw new Error(`${ACCOUNT_BALLANCE_LOW} - sum of all amount is to low`)
   }
}


export function initRequiredParams() : Map<string, string[]> {
   const requiredParams = new Map<string, string[]>();
   requiredParams.set('individual', ['individual_id', 'first_name', 'last_name', 'currency']);
   requiredParams.set('business', ['compay_id', 'company_name', 'currency']);
   requiredParams.set('family', ['owners', 'currency']);
   return requiredParams;
 }
