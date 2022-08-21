//import express
import * as express from "express";
import {Request, Response} from "express";
const app = express()
//import CORS
const cors = require("cors")
//import db accessories
import User from "./entities/User";
import { DataSource } from "typeorm";
//Connecting to database
export const myAppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "changeme",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})
//Initializing the database
myAppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
 //config env 
 import "dotenv/config"

//Middleware
//Cors
app.use(cors())
//Parsing json reqs
app.use(express.json())
//Routes
import authentication from "./routes/authentication";
import authorization from "./routes/authorization";
import posts from "./routes/posts";
import fileUpload from "./routes/file-upload";
//regular routes
app.use(authentication)
app.use(authorization)
// Protected Route
app.use("/api/", posts)
//file upload
app.use("upload", fileUpload)

//Running Server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running on port: ${process.env.SERVER_PORT}`)
})