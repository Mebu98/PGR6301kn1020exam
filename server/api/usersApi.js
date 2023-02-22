import express from "express";
import { ObjectId } from "mongodb";

export function UsersApi(db) {
  const usersApi = express.Router();

  /** Register user */
  usersApi.post("/register", async (req, res) => {
    const { username, name, password } = req.body;

    // Check if username exists
    const users = await db
      .collection("users")
      .find({ username: username })
      .toArray();

    if (users.length > 0) {
      res.sendStatus(409);
      return;
    }

    // insert user into database
    db.collection("users").insertOne({
      username,
      name,
      password,
      role: "undefined",
    });

    res.sendStatus(200);
  });

  /** check if user is logged in via cookie */
  usersApi.get("/cookie", async (req, res) => {
    const userIdCookie = req.signedCookies.userId;

    if (!userIdCookie) {
      return res.sendStatus(401);
    }

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userIdCookie) });

    if (!user) {
      return res.sendStatus(401);
    }
    res.send({ username: user.username, name: user.name, role: user.role });
  });

  /** Login */
  usersApi.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await db.collection("users").findOne({ username: username });

    if (user && user.password === password) {
      res.cookie("userId", user._id, { signed: true });
      res.cookie("role", user.role, { signed: true });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });

  /** Logout */
  usersApi.delete("/logout", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("role");
    res.sendStatus(200);
  });

  /** update user */
  usersApi.put("/update/", async (req, res) => {
    const { id, username, name, role } = req.body;

    // check if sender is manager
    if (req.signedCookies.role !== "manager") {
      res.sendStatus(401);
      return;
    }

    // check database if user is manager (extra security check?)
    const sender = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.signedCookies.userId) });
    if (sender.role !== "manager") {
      res.sendStatus(401);
      return;
    }

    // check if new username is already in use
    if (await db.collection("users").findOne({ username: username })) {
      res.sendStatus(409);
      return;
    }

    // update user
    // We only want to update the fields that are not empty
    const objForUpdate = {};
    if (username.length > 0) objForUpdate.username = username;
    if (name.length > 0) objForUpdate.name = name;
    if (role.length > 0) objForUpdate.role = role;

    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...objForUpdate } })
      .then((response) => {
        if (response.modifiedCount === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
  });

  /** delete user */
  usersApi.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    // check if sender is manager
    if (req.signedCookies.role !== "manager") {
      res.sendStatus(401);
      return;
    }

    // check database if user is manager (extra security check since this is a delete request)
    const sender = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.signedCookies.userId) });
    if (sender.role !== "manager") {
      res.sendStatus(401);
      return;
    }

    // delete user
    await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) })
      .then((response) => {
        console.log(response);
        if (response.deletedCount === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
  });

  /** get all roles */
  usersApi.get("/roles", async (req, res) => {
    const roles = await db.collection("users").distinct("role");
    res.send(roles);
  });

  /** get all users */
  usersApi.get("/all", async (req, res) => {
    if (req.signedCookies.role !== "manager") {
      res.sendStatus(401);
    }

    const users = await db.collection("users").find().toArray();
    res.send(users);
  });

  return usersApi;
}
