//express
import * as express from "express";
const router = express.Router();
import {Request, Response} from "express";
//multer
import * as multer from "multer";
const upload = multer({dest: 'uplopads/'})
//file in request type
interface MulterRequest extends Request {
    file: any;
}
//import token verification
import {tokenVerification}  from "../validation/verifyToken";


router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Upload File")
})

//Don't forget the enctype="multipart/form-data" in your form.

router.post("/", tokenVerification ,upload.single('file') ,(req: MulterRequest, res: Response) => {
    // console.log(req.file)
    //Save to database
})

export default router;