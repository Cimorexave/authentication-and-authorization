//import express
import * as express from "express";
import {Request, Response} from "express";
const app = express()
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
 //config env 
 import "dotenv/config"

//Middleware
//Parsing json reqs
app.use(express.json())
//Routes
import authentication from "./routes/authentication";
import authorization from "./routes/authorization";
import posts from "./routes/posts";
//regular routes
app.use(authentication)
app.use(authorization)
// Protected Route
app.use("/api/", posts)

//Running Server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Running on port: ${process.env.SERVER_PORT}`)
})