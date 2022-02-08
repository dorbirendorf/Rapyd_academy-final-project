// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { IAccount, IFamily } from "../types/types.js";
// import * as DB_FAMILY from "./family.db.js";
// import * as DB_ACCOUNT from "../account/account.db.js";
// import { validateFamilyAccounts } from "./family.validator.js";


//   export async function createFamilyAccount(family:Partial<IFamily>,owners:[number,number][],currency):Promise<any>{
//     const individualIds = owners.map((owner)=>owner[1]);
//     const accounts:IAccount[] = await DB_ACCOUNT.getAllIndividualsAccountsById(individualIds);
//     validateFamilyAccounts(accounts,owners,currency);
//     return await DB_FAMILY.createFamilyAccount(family);
//    }
   
//   //  export async function getFamilyAccountByIdShort(familyId:string):Promise<any>{
//   //   return await DB_FAMILY.getFamilyAccountByIdShort(familyId);
//   //  }

//    export async function getFamilyAccountByIdFull(familyId:string):Promise<any>{
//     return await DB_FAMILY.getFamilyAccountByIdFull(familyId);
//    }

  //  export async function getFamilyAccounts():Promise<any>{
  //   return await DB_FAMILY.getFamilyAccounts();
  //  }
   
  //  export async function addIndividualsToFamilyAccountShort(familyId:string, payload:any):Promise<any>{
  //   return await DB_FAMILY.addIndividualsToFamilyAccountShort(familyId, payload);
  //  }

  //  export async function addIndividualsToFamilyAccountFull(familyId:string, payload:any):Promise<any>{
  //   return await DB_FAMILY.addIndividualsToFamilyAccountFull(familyId, payload);
  //  }

  //  export async function removeIndividualsFromFamilyAccountShort(familyId:string, payload:any):Promise<any>{
  //   return await DB_FAMILY.removeIndividualsFromFamilyAccountShort(familyId, payload);
  //  }

  //  export async function removeIndividualsFromFamilyAccountFull(familyId:string, payload:any):Promise<any>{
  //   return await DB_FAMILY.removeIndividualsFromFamilyAccountFull(familyId, payload);
  //  }
  //  export async function closeFamilyAccount(familyId:string):Promise<any>{
  //   return await DB_FAMILY.closeFamilyAccount(familyId);
  //  }
