import express from "express";
import bodyParser from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as path from "path";

import {LoginApi} from "./api/loginApi.js";
import {ActivitiesApi} from "./api/activitiesApi.js";
import {MongoClient} from "mongodb";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongodbUrl = process.env.MONGODB_URL;

if(mongodbUrl){
    const mongoClient = new MongoClient(mongodbUrl);
    const mongoDatabaseName = process.env.MONGODB_DATABASE || "pg6301exam";
    const mongoDatabase = mongoClient.db(mongoDatabaseName);

    mongoClient.connect().then(async () => {
        app.use("/api/login", LoginApi(mongoDatabase));
        app.use("/api/activities", ActivitiesApi(mongoDatabase));
    });
}

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api/")) {
        return res.sendFile(path.resolve("../client/dist/index.html"));
    }
    else {
        next();
    }
});



const server = app.listen( process.env.PORT || 3000, () =>
{
    console.log(`Server started on http://localhost:${server.address().port}`)
});
