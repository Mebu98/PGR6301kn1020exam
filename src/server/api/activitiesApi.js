import express from "express";

export const activitiesApi = new express.Router();

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
    res.json(SAMPLEACTIVITIES);
});

// Upload new activity
activitiesApi.post("/new", (req, res) => {
    const { name, description } = req.body;

    if(!name || name.length === 0) return res.sendStatus(400);

    const newActivity = { name, description, id: SAMPLEACTIVITIES.length + 1};

    SAMPLEACTIVITIES.push(newActivity);
    res.send(newActivity);
});

activitiesApi.get("/:id", (req, res) => {
    const activity = SAMPLEACTIVITIES.find(a => a.id === parseInt(req.params.id));
    if (!activity) return res.sendStatus(404);
    res.send(activity);
});