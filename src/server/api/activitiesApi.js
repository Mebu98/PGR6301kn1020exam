import express from "express";

export function ActivitiesApi(db){
    const activitiesApi = express.Router();

    const SAMPLEACTIVITIES = [
        {
            id: 1,
            name: "Activity 1",
            description: "Description 1",
        },
        {
            id: 2,
            name: "Activity 2",
            description: "Description 2",
        }
        ];

    // Get all activities
    activitiesApi.get("/", (req, res) => {
        if(db){
            db.collection("activities").find().toArray().then(activities => {
                res.json(activities);
            });
        }
        else{
            res.sendStatus(500);
        }
    });

    // Upload new activity
    activitiesApi.post("/new", (req, res) => {

        // See if uploader is manager
         if(req.signedCookies.role !== "manager"){
             res.sendStatus(403);
             return;
         }

        const { name, description } = req.body;

        if(!name || name.length === 0) return res.sendStatus(400);

        const newActivity = { name, description };

        if(db){
            db.collection("activities").insertOne(newActivity).then(result => {
                // Return the new activity
                newActivity._id = result.insertedId;
                res.json(newActivity);
            });
        }
        else{
            res.sendStatus(500);
        }
    });

    activitiesApi.get("/:id", (req, res) => {
        const activity = SAMPLEACTIVITIES.find(a => a.id === parseInt(req.params.id));
        if (!activity) return res.sendStatus(404);
        res.send(activity);
    });

    return activitiesApi;
}

