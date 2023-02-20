import dotenv from "dotenv";
import express from "express";
import bodyParser from "express";
import cookieParser from "cookie-parser";

export function configureExpress(){
    dotenv.config();
    const app = express();
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    return app;
}