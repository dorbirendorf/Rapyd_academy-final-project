// import * as DB_FAMILY from "./family.db.js"
// import { family } from "./family.interface.js";

  export async function createFamilyAccount(family:family):Promise<any>{
      //getallIndiviuals([accountid,int][])- > type :Iacount[]
      //service validation(Iaccount,tupels);
    return await DB_FAMILY.createFamilyAccount(family);
   }
   
//    export async function getFamilyAccountByIdShort(familyId:string):Promise<any>{
//     return await DB_FAMILY.getFamilyAccountByIdShort(familyId);
//    }

//    export async function getFamilyAccountByIdFull(familyId:string):Promise<any>{
//     return await DB_FAMILY.getFamilyAccountByIdFull(familyId);
//    }

//    export async function getFamilyAccounts():Promise<any>{
//     return await DB_FAMILY.getFamilyAccounts();
//    }
   
//    export async function addIndividualsToFamilyAccountShort(familyId:string, payload:any):Promise<any>{
//     return await DB_FAMILY.addIndividualsToFamilyAccountShort(familyId, payload);
//    }

//    export async function addIndividualsToFamilyAccountFull(familyId:string, payload:any):Promise<any>{
//     return await DB_FAMILY.addIndividualsToFamilyAccountFull(familyId, payload);
//    }

//    export async function removeIndividualsFromFamilyAccountShort(familyId:string, payload:any):Promise<any>{
//     return await DB_FAMILY.removeIndividualsFromFamilyAccountShort(familyId, payload);
//    }

//    export async function removeIndividualsFromFamilyAccountFull(familyId:string, payload:any):Promise<any>{
//     return await DB_FAMILY.removeIndividualsFromFamilyAccountFull(familyId, payload);
//    }
//    export async function closeFamilyAccount(familyId:string):Promise<any>{
//     return await DB_FAMILY.closeFamilyAccount(familyId);
//    }
