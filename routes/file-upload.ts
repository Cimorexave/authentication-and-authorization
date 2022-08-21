//express
import * as express from "express";
const router = express.Router();
import {Request, Response} from "express";

router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Upload File")
})

router.post("/", (req: Request, res: Response) => {


})

export default router;