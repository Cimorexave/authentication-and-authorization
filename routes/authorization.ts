//import express
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router()

//import jwt
import * as jwt from "jsonwebtoken";

//import Bcrypt
const bcrypt = require("bcryptjs");

//import schema
import User from "../entities/User";

//import datasource
import { myAppDataSource } from "../server";
const userRepository = myAppDataSource.getRepository(User)

//Validation
import {validation as validate} from "../validation/validation"

//GET REQUEST
router.get("/login", (req: Request, res: Response) => {
    res.status(200).send("Login User: Send username and password in the body")
})
//POST REQUEST
router.post("/login", async (req: Request, res: Response) => {
    //User Request Validation
    const {error} = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)

    //Checking if the user has registered before
    const user = await userRepository.findOneBy({
        name: req.body.username
    })
    console.log({user})
    if (!user) res.status(400).send(`User doesn't exist.`)

    //Check for password
    const validPassword = bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Password is incorrect")

    //Creating a token
    const token = jwt.sign({user: user.id} , process.env.TOKEN_SECRET,
    {expiresIn: 60 * 60})
    //Send the token
    res.json({
        token
    })

    // res.send("Logged in successfully!")

})

export default router