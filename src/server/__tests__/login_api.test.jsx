import request from "supertest";
import { configureExpress } from "../test_utils.js";
import { loginApi } from "../api/usersApi.js";

const app = configureExpress();

app.use("/api/login", loginApi);

const testUser = {
  username: "test",
  name: "test",
  role: "test",
  password: "test",
};

describe("loginApi server test suite", () => {
  it("can report 401 (unauthorized)", async () => {
    const agent = request.agent(app);
    const response = await agent.get("/api/login");
    expect(response.status).toEqual(401);
  });

  it("can register user", async () => {
    const agent = request.agent(app);
    const response = await agent.post("/api/login/register").send(testUser);
    expect(response.status).toEqual(200);
  });

  it("reports 400 if username or password < 3", async () => {
    const agent = request.agent(app);
    const response = await agent
      .post("/api/login/register")
      .send({ username: "1", password: "1" });

    expect(response.status).toEqual(400);
  });

  /*
    // TODO: Fix this test
    it("can login user", async () => {
        const agent = request.agent(app);

        await agent
            .post("/api/login/register")
            .send(testUser);

        const response = await agent
            .post("/api/login/")
            .send(
                {
                    username: testUser.username,
                    password: testUser.password
                }
            )

        expect(response.status).toEqual(200);
    });
     */
});
