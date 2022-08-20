import joi from "@hapi/joi";
import * as express from "express";
const router = express.Router()

//Register Validation
export const registerValidation = data => {
    const registerValidationSchema = {
        name: joi.string().min(3).required(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data , registerValidationSchema)
}

//Login Validation
export const loginValidation = data => {
    const loginValidationSchema = {

    }
    return joi.validate(data, loginValidationSchema)
}