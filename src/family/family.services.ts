/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IFamily, IIndividual } from "../types/types.js";
import  DB_ACCOUNT from "../account/account.db.js";
import DB_FAMILY from "../family/family.db.js";
import DB_INDIVIDUAL from "../individual/individual.db.js";
import family_validator from "./family.validator.js";
import config from "../config.js"
const {ACCOUNT_STATUS_FIELD,INVALID_FILED_VALUE,MIN_FAMILY_BALANCE} = config;
import validation_func from "../utils/validationFunc.js";
import utils from "../utils/utils.js";
import logger from "../utils/logger.js";
class FamilyService
{
 async  createFamilyAccount(family_create: Partial<IFamily>,owners: [number, number][],currency: string): Promise<any> {
    try {
    logger.params("createFamilyAccount", {family_create,owners,currency});
    const individualIds = utils.convertTupelsToArray(owners);
    const accounts: IIndividual[] =await DB_INDIVIDUAL.getAllIndividualsAccountsById(individualIds);   
    family_validator.validateAddToFamily(accounts, owners, currency);

    const familyId = await DB_FAMILY.createFamilyAccount(family_create);
    const family = await this.getFamilyAccountByIdShort(familyId);
    let ans = await this.execAddToFamily(individualIds,accounts ,owners,family,"full");      
    logger.funcRet("createFamilyAccount",ans);
    return ans;
} catch (error) {
    logger.error("createFamilyAccount", error as Error);
   throw error;
}
}

async  execAddToFamily(individualIds:number[],accounts:IIndividual[] ,owners:[number,number][],family:IFamily,format:string):Promise<IFamily>{
    let IndividualSBalance: [number, number][] = accounts.map((account) => {
        const owner = owners.find((own) => own[0] === account.account_id) as [number,number];
        return [owner[0], account.balance - owner[1]];
    });

    const familyBalance: [number, number] = [
        family.account_id,
        owners.reduce((prev, owner) => owner[1] + prev, family.balance),
    ];
    IndividualSBalance.push(familyBalance);
    await DB_ACCOUNT.updateAccountsBalance(IndividualSBalance);
    await DB_FAMILY.addIndividualsToFamilyAccount(family.account_id,individualIds);
    let FamilyAccount =await this.getFamilyAccountById(family.account_id,format);
        if (!FamilyAccount) {
            throw new Error("Data not found")
        }
    logger.funcRet("execAddToFamily",FamilyAccount)
    return FamilyAccount;
}

 async  addIndividualsToFamilyAccount(familyId: number,owners: [number, number][],format: string): Promise<any> {
    try {
        logger.params("addIndividualsToFamilyAccount", { familyId, owners, format })
       
        const family = await this.getFamilyAccountByIdShort(familyId);
        if (!family) {
            throw new Error("Data not found")
        }
        const individualIds = utils.convertTupelsToArray(owners);
        const accounts: IIndividual[] = await DB_INDIVIDUAL.getAllIndividualsAccountsById(individualIds);
        if (!accounts||accounts.length === 0 || accounts.length < owners.length) {
            throw new Error("Data not found")
        }
        family_validator.validateAddToFamily(accounts, owners, family.currency);
        let updatedFamily = this.execAddToFamily(individualIds,accounts ,owners,family,format);
        
        logger.funcRet("addIndividualsToFamilyAccount",updatedFamily);
        return updatedFamily;
    
    } catch (error) {
        logger.error("addIndividualsToFamilyAccount", error as Error);
        throw error;
    }
}

 async  getFamilyAccountByIdShort(familyId: number): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdShort", { familyId });

        let familyAccount = await DB_FAMILY.getFamilyAccountByIdShort(Number(familyId));
        if (!familyAccount) {
            throw new Error("Data not found")
        }
        logger.funcRet("getFamilyAccountByIdShort", familyAccount);
        return familyAccount;

    } catch (error) {
        logger.error("getFamilyAccountByIdShort", error as Error);
        throw error;
    }
}

 async  getFamilyAccountByIdFull(familyId: number): Promise<IFamily> {
    try {
        logger.params("getFamilyAccountByIdFull", { familyId });

        let familyAccount = await DB_FAMILY.getFamilyAccountByIdFull(Number(familyId));
if (!familyAccount) {
            throw new Error("Data not found")
        }
        logger.funcRet("getFamilyAccountByIdFull", familyAccount);
        return familyAccount;

    } catch (error) {
        logger.error("getFamilyAccountByIdFull", error as Error);
        throw error;
    }
}

 async  closeFamilyAccount(familyId: number): Promise<any> {
    try{
    logger.params("closeFamilyAccount", { familyId });

    const family = await this.getFamilyAccountByIdFull(familyId);
    if (!family) {
        throw new Error("Data not found")
    }
    if (family.status == false) {
        throw new Error(
            `${INVALID_FILED_VALUE}- family ${family.account_id} accout is alreay close`
        );
    }
    if ((family.owners as IIndividual[]).length > 0) {
        throw new Error(
            `${ACCOUNT_STATUS_FIELD}- family ${family.account_id} still have owners`
        );
    }
    await DB_ACCOUNT.updateAccountsStatus([Number(familyId)], false);

    logger.funcRet("closeFamilyAccount","void");
    }catch (error) {
            logger.error("closeFamilyAccount", error as Error);
           throw error;
        }
}


 async  removeIndividualsFromFamilyAccount(familyId: number,owners: [number, number][],format: string): Promise<any> {
    try {
        logger.params("removeIndividualsFromFamilyAccount", { familyId, owners, format });
        
        const family = await this.getFamilyAccountByIdFull(familyId);
        if (!family) {
            throw new Error("Data not found")
        }
        const accounts: IIndividual[] = await DB_INDIVIDUAL.getAllIndividualsAccountsById(utils.convertTupelsToArray(owners));
        if (!accounts||accounts.length === 0 || accounts.length < owners.length) {
            throw new Error("Data not found")
        }
        await family_validator.validateRemoveFromFamily(accounts, owners, family);
        let removeBalance = 0;
        
        if ((family.owners as IIndividual[]).length === owners.length) {  //remove all family memebers
            removeBalance = validation_func.sumFamilyAmounts(owners, family.balance, false); //should be >=0
        }
        if ((family.owners as IIndividual[]).length > owners.length) {   //remove part of family members
            removeBalance = validation_func.sumFamilyAmounts(owners, family.balance - MIN_FAMILY_BALANCE, false); //should be >=5000
        }

        const family_account = await this.execRemoveFromFamily(accounts,owners,family,removeBalance,format,familyId);
    
        logger.funcRet("removeIndividualsFromFamilyAccount", family_account);
        return family_account
        
    }
    catch (error) {
        logger.error("removeIndividualsFromFamilyAccount", error as Error);
        throw error;
    }
}

async  getFamilyAccountById(familyId:number,format: string  ) {
    logger.params("private-getFamilyAccountById",{familyId,format})
    let ans =
        format === "full" ?
        await DB_FAMILY.getFamilyAccountByIdFull(familyId) :
        await DB_FAMILY.getFamilyAccountByIdShort(familyId);
    if(!ans){
        throw new Error("Data not found")
    }
    logger.funcRet("getFamilyAccountById", ans);
    return ans;

}

async  execRemoveFromFamily(accounts: IIndividual[],owners:[number, number][],family:IFamily,removeBalance:number,format:string,familyId:number) {
    logger.params("execRemoveFromFamily",{accounts,owners,family,removeBalance,format,familyId})
    
    let IndividualSBalance: [number, number][] = accounts.map((account) => {
        const owner = owners.find((own) => own[0] === account.account_id) as [number, number];
        return [owner[0], account.balance + owner[1]];
    });
    
    const familyBalance: [number, number] = [family.account_id,family.balance - removeBalance];
    IndividualSBalance.push(familyBalance);
    await DB_ACCOUNT.updateAccountsBalance(IndividualSBalance);
    await DB_FAMILY.removeIndividualsFromFamilyAccount(family.account_id,owners);
   
    let family_account = await this.getFamilyAccountById(familyId,format);
    if (!family_account) {
        throw new Error("Data not found")
    }
    logger.funcRet("execRemoveFromFamily",family_account)
    return family_account
}}

const service = new FamilyService()
export default service;