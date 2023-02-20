import express from "express";

export const loginPath = new express.Router();

const USERS = [
    {
        username: "user",
        name: "userUserson",
        password: "user",
    }];

loginPath.get("/", (req, res) =>{
    function respond() {
            const cookieUsername = req.signedCookies.username;
            if(!cookieUsername) {
                return res.sendStatus(401);
            }

            const user = USERS.find(u => u.username === cookieUsername);
            const {username, name } = user;

            res.json({username, name});
        }
    setTimeout(respond, 3000);
});

loginPath.post("/", (req, res) =>{

    console.log("getting this far");

    const { username, password } = req.body;
    console.log(req.body);

    const user = USERS.find(u => u.username === username);

    if(user && user.password === password){
        res.cookie("username", username, {signed : true});
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }


    function loginMiddleware(req, res, next) {
        res.user = USERS.find(u => u.username === req.username);
        next();
    }

    loginPath.use(loginMiddleware);
});