import express from "express";
import { ObjectId } from "mongodb";

export function ActivitiesApi(db) {
  const activitiesApi = express.Router();

  // Get all activities
  activitiesApi.get("/", (req, res) => {
    if (db) {
      db.collection("activities")
        .find()
        .toArray()
        .then((activities) => {
          res.json(activities);
        });
    } else {
      res.sendStatus(500);
    }
  });

  // Upload new activity
  activitiesApi.post("/new", (req, res) => {
    // See if uploader is manager
    if (req.signedCookies.role !== "manager") {
      res.sendStatus(403);
      return;
    }

    const { name, category, description } = req.body;

    if (!name || name.length === 0) return res.sendStatus(400);

    const newActivity = { name, category, description };

    if (db) {
      db.collection("activities")
        .insertOne(newActivity)
        .then((result) => {
          // Return the new activity
          newActivity._id = result.insertedId;
          res.json(newActivity);
        });
    } else {
      res.sendStatus(500);
    }
  });

  // Delete activity
  activitiesApi.delete("/:id", (req, res) => {
    // See if uploader is manager
    if (req.signedCookies.role !== "manager") {
      res.sendStatus(403);
      return;
    }
    const { id } = req.params;

    if (!id || id.length === 0) return res.sendStatus(400);

    db.collection("activities")
      .deleteOne({ _id: new ObjectId(id) })
      .then((result) => {
        if (result.deletedCount === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      });
  });

  return activitiesApi;
}
