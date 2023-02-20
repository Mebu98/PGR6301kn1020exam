import express from "express";

export const loginApi = new express.Router();

const USERS = [
    {
        username: "user",
        name: "userUserson",
        role: "manager",
        password: "user"
    }];

// Register user
loginApi.post("/register", (req, res) =>{
    const { username, name, password } = req.body;
    // Check if user exists
    if(USERS.find(u => u.username === username)){
        return res.sendStatus(409);
    }

    USERS.push({username, name, role: "none", password});
    res.sendStatus(200);
});

//check if user is logged in via cookie
loginApi.get("/", (req, res) =>{
        const cookieUsername = req.signedCookies.username;
        if(!cookieUsername) {
            return res.sendStatus(401);
        }

        const user = USERS.find(u => u.username === cookieUsername);
        const {username, name , role} = user;

        res.json({username, name, role});
});

// Login
loginApi.post("/", (req, res) =>{
    const { username, password } = req.body;

    const user = USERS.find(u => u.username === username);

    if(user && user.password === password){
        res.cookie("username", username, {signed : true});
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

// Logout
loginApi.delete("/", (req, res) =>{
    res.clearCookie("username");
    res.sendStatus(200);
});