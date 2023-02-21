import express from "express";
import {ObjectId} from "mongodb";


export function UsersApi(db){
    const usersApi = express.Router();

// Register user
    usersApi.post("/register", async (req, res) => {
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
    usersApi.get("/cookie", async (req, res) => {
        const userIdCookie = req.signedCookies.userId;
        if (!userIdCookie) {
            return res.sendStatus(401);
        }

        const user = await db.collection("users")
            .findOne({_id: new ObjectId(userIdCookie)});

        if (!user) {
            return res.sendStatus(401);
        }
        res.send({username: user.username, name: user.name, role: user.role})
    });

    // Login
    usersApi.post("/login", async (req, res) => {
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
    usersApi.delete("/logout", (req, res) =>{
        res.clearCookie("userId");
        res.clearCookie("role");
        res.sendStatus(200);
    });


    // get all roles
    usersApi.get("/roles", async (req, res) => {
        const roles = await db.collection("users").distinct("role");
        res.send(roles);
    });

    // get all users
    usersApi.get("/all", async (req, res) => {
        if(req.signedCookies.role !== "manager"){
            res.sendStatus(401);
        }

        const users = await db.collection("users").find().toArray();
        res.send(users);
    });
    return usersApi;
}

