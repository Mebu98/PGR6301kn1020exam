import request from "supertest";
import {configureExpress, configureMongoDb} from "../test_utils.js";
import { ActivitiesApi } from "../api/activitiesApi.js";

const app = configureExpress();
let mongoClient, mongoDb;


const testActivity = {
  name: "test",
  description: "test",
};

beforeAll(async () => {
  const {client, db} = await configureMongoDb();
    mongoClient = client;
    mongoDb = db;
  app.use("/api/activities", ActivitiesApi(mongoDb));

});

afterAll(async () => {
    await mongoClient.close();
});

describe("activitiesApi server test suite", () => {
    it("test suite works", () => {
        expect(true).toEqual(true);
    });
/*
  //TODO: Test fails because of cookie...
  it("can upload activity", async () => {
    const agent = request.agent(app);
    const response = await agent.post("/api/activities/new")
        .send(testActivity);
    expect(response.status).toEqual(200);
  });
*/
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
