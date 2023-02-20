import express from "express";
import bodyParser from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as path from "path";

import {loginApi} from "./api/loginApi.js";
import {activitiesApi} from "./api/activitiesApi.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));


app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api/")) {
        return res.sendFile(path.resolve("../client/dist/index.html"));
    }
    else {
        next();
    }
});

app.use("/api/login", loginApi);
app.use("/api/activities", activitiesApi);

const server = app.listen( process.env.PORT || 3000, () =>
{
    console.log(`Server started on http://localhost:${server.address().port}`)
});
