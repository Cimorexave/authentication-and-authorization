//import express
import express from "express";
import {Request, Response} from "express";
const app = express()
 //config env 
 import "dotenv/config"
 //Connecting to the Database

//Middleware
//Parsing json reqs
app.use(express.json())
