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
}