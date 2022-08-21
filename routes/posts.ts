//import express
import * as express from "express";
import {Request, Response} from "express";
const router = express.Router()

//import token verification
import {tokenVerification}  from "../validation/verifyToken";

router.get('/posts', tokenVerification , (req,res) => {
    return res.json({
        success:true,
        msg:"Hello world"
    })
})

router.post("/posts/", tokenVerification, (req, res) => {
    res.json({
        "secret" : true,
        "msg" : "protected data"
    })
})

export default router