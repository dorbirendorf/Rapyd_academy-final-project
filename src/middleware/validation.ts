import { RequestHandler } from "express";
import { validateBusinessModel } from "../business/business.validator.js";
import { validateFamilyModel } from "../family/family.validator.js";
import {validateIndividualModel,} from '../individual/individual.validator.js';
import { SOMTHING_WENT_WRONG } from "../types/constants.js";

export function validateModelCreation(model:string):RequestHandler{
    switch (model){
        case "individual":
            return validateIndividualModel;
        case "business":
            return validateBusinessModel;
        case "family" :
            return validateFamilyModel
        default:
            throw new Error(SOMTHING_WENT_WRONG);
    }
}