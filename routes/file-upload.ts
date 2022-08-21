//express
import * as express from "express";
const router = express.Router();
import {Request, Response} from "express";

//import jwt
import * as jwt from "jsonwebtoken";

//User Schema
import User from "../entities/User";
//import datasource
import { myAppDataSource } from "../server";
const userRepository = myAppDataSource.getRepository(User)

//multer
import * as multer from "multer";
const upload = multer({dest: 'uplopads/'})
//file in request type
interface MulterRequest extends Request {
    file: any;
}

//import token verification
import {tokenVerification}  from "../validation/verifyToken";

//jwtpayload type extend
interface jwtDecodePayload extends jwt.JwtPayload {
    id: number
}

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Upload File")
})

//Don't forget the enctype="multipart/form-data" in your form.

router.post("/", /*tokenVerification ,*/upload.single('file') , async (req: MulterRequest, res: Response) => {
    // console.log(req.file)
    //looking for token
    const token = req.header('auth-token')
    if (!token) return res.status(400).send("Access Denied.")
    
    // const decodedUser: jwtDecodePayload =  (typeof(jwt.decode(token)) === "object" ) ? jwt.decode(token) : { }
    
    //Save to database
    //finding the user with the same id
    const payload = jwt.decode(token)
    const user = await userRepository.findOneBy({
        id: payload['id']
    })

    const newUser = {...user, uploaded_file: req.file.path}
    // //Update database
    await user.save()
    res.status(200).send(newUser)
})

export default router;