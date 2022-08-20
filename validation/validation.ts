const Joi = require("joi")
import * as express from "express";
const router = express.Router()

//Register & Login Validation
export const validation = data => {
    const validationSchema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    })
    // return joi.validateAsync(data , validationSchema)
    return validationSchema.validate({ name: data.username, password: data.password})
}
