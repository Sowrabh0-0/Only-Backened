import express from "express";
import cors from cors;
import cookieParser from "cookie-parser";

const app = express()

app.use(cors(
    {
    origin: process.env.CORS_ORIGIN,
    Credential: true
    }
))

app.use(express.json(
    {
        limit : '50kb'  // Maximum request body size.
    }
))

app.use(express.urlencoded(
    {
        extended:true,
        limit: '50kb',
    }
))

app.use(express.static("public"))

app.use(cookieParser())

export { app }