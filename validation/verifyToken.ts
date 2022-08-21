//import jwt
import * as jwt from "jsonwebtoken";
//import express middleware types
import { Request, Response } from "express";
//import jwt secret token
import TOKEN_SECRET from "../config";

interface IGetUserAuthInfoRequest extends Request {
    user: jwt.JwtPayload | string // or any other type
}

//jwt middleware function
export function tokenVerification(req: IGetUserAuthInfoRequest, res: Response, next: any) {
    //looking for token
    const token = req.header('auth-token')
    if (!token) return res.status(400).send("Access Denied.")

    //token verification
    try {
        const verified = jwt.verify(token, TOKEN_SECRET)
        console.log("verified: ", verified)
        req.user = verified;
        next()
    } catch(error) {
        console.log({error})
        res.status(400).send("Invalid Token")
    }
}