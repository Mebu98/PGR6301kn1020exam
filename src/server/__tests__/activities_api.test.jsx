import request from "supertest";
import { configureExpress } from "../test_utils.js";
import { activitiesApi } from "../api/activitiesApi.js";

const app = configureExpress();

app.use("/api/activities", activitiesApi);

const testActivity = {
  name: "test",
  description: "test",
};

describe("activitiesApi server test suite", () => {
  it("can upload activity", async () => {
    const agent = request.agent(app);
    const response = await agent.post("/api/activities/new").send(testActivity);
    expect(response.status).toEqual(200);
  });

  /*
    //TODO: Continue working on this test
    it("can get activity by id", async () => {
        const agent = request.agent(app);
        const id = await agent.post("/api/activities").send(testActivity).id;
        const response = await agent
            .get("/api/activities/1");
    });

     */
});
