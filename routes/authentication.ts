//import express
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router()
//import bcrypt
// import bcrypt from "bcryptjs"; // bcrypt object is undefined when importing it
const bcrypt = require("bcryptjs");
//import schema
import User from "../entities/User";

//import datasource
import { myAppDataSource } from "../server";
const userRepository = myAppDataSource.getRepository(User)

//Validation
import {validation as validate} from "../validation/validation"

//GET REQUEST
router.get("/register", (req: Request, res: Response) => {
    res.status(200).send("Register User")
})
//POST REQUEST
router.post("/register", async (req: Request, res: Response) => {
    
    //User Request Validation
    const {error} = await validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    
    //Checking if the user has registered before
    const userExists = await userRepository.findOneBy({
        name: req.body.username
    })
    if (userExists) res.status(400).send("User already exists in the database")
    
    //Hash the password
    // console.log(bcrypt) // bcrypt object is undefined when importing it
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Creating a user instance
    const user = new User
    user.name = req.body.username
    user.password = hashedPassword

    //Saving to database
    await user.save()

    //Response
    res.status(200).json({ "success": true, user })
})

export default router