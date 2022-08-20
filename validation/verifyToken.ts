//import jwt
import jwt from "jsonwebtoken";
//import express middleware types
import { Request, Response } from "express";

//jwt middleware function
export function tokenVerification(req: Request, res: Response, next: any) {
    //looking for token
    const token = req.header['auth-token']
    if (!token) return res.status(400).send("Access Denied.")

    //token verification
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.body.user = verified;
    } catch(error) {
        res.status(400).send("Invalid Token")
    }
    next()
}