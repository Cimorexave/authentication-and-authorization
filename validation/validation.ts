import joi from "@hapi/joi";
import * as express from "express";
const router = express.Router()

//Register & Login Validation
export const validation = data => {
    const validationSchema = {
        name: joi.string().min(3).required(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data , validationSchema)
}
