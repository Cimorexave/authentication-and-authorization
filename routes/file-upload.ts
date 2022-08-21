//express
import * as express from "express";
const router = express.Router();
import {Request, Response} from "express";
import { any } from "joi";
//multer
import * as multer from "multer";
const upload = multer({dest: 'uplopads/'})
//file in request type
interface MulterRequest extends Request {
    file: any;
}

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Upload File")
})

//Don't forget the enctype="multipart/form-data" in your form.

router.post("/", upload.single('file') ,(req: MulterRequest, res: Response) => {
    console.log(req.file)
})

export default router;