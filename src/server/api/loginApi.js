import express from "express";
import {ObjectId} from "mongodb";


export function LoginApi(db){
    const loginApi = express.Router();

    const USERS = [
        {
            username: "user",
            name: "userUserson",
            role: "manager",
            password: "user"
        }];

    // Register user
    loginApi.post("/register", async (req, res) => {
        const {username, name, password} = req.body;

        // Check if user exists
        const users = await db
            .collection("users")
            .find({username: username})
            .toArray();

        if(users.length > 0){
            res.sendStatus(409);
            return;
        }

        // insert user into database
        db.collection("users").insertOne({username, name, password, role: "undefined"});

        res.sendStatus(200);
    });

    //check if user is logged in via cookie
    loginApi.get("/", async (req, res) => {
        const userIdCookie = req.signedCookies.userId;
        if (!userIdCookie) {
            return res.sendStatus(401);
        }

        const user = await db.collection("users")
            .findOne({_id: new ObjectId(userIdCookie)});

        if (!user) {
            return res.sendStatus(401);
        }
        res.send(user)
    });

    // Login
    loginApi.post("/", async (req, res) => {
        const {username, password} = req.body;

        const user = await db.collection("users")
            .findOne({username: username});

        if (user && user.password === password) {
            res.cookie("userId", user._id, {signed: true});
            res.cookie("role", user.role, {signed: true});
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });

    // Logout
    loginApi.delete("/", (req, res) =>{
        res.clearCookie("userId");
        res.clearCookie("role");
        res.sendStatus(200);
    });

    return loginApi;
}

