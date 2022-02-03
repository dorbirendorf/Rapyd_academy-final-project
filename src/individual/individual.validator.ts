/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request ,Response, NextFunction } from "express";

// Validation criteria:
// If the primaryID (not the individualID) is provided, an error should be returned
// The individualID, and the firstname and lastname fields are mandatory to create an individual account
// The individualID should be a number greater or equal to 1,000,000 and to have 7 digits


