const request = require("supertest");
const server = require("../server.js");
const db = require("../database/dbConfig.js");

let token;
let userID;

beforeEach(async () => {
  await db("users").truncate();
  const register = await request(server).post("/auth/register").send({
    username: "testbot",
    password: "qwerty",
    email: "test@qwertry.com",
  });
  const res = await request(server)
    .post("/auth/login")
    .send({ username: "testbot", password: "qwerty" });
  token = res.body.token;
});

describe("users-router.js", () => {
  describe("POST /register", () => {
    it("should return 201", async () => {
      const res = await request(server).post("/auth/register").send({
        username: "abcde",
        password: "qwerty",
        email: "test@qwertyuiop.com",
      });
      expect(res.status).toBe(201);
    });
    it("should return 500", async () => {
      const res = await request(server)
        .post("/auth/register")
        .send({ username: true, password: null, email: null });
      expect(res.status).toBe(500);
    });

    it('should have a message of "You successfully registered! (response being updated)"', async () => {
      const res = await request(server).post("/auth/register").send({
        username: "abcde",
        password: "qwerty",
        email: "test@qwertyuio.com",
      });
      let response = JSON.parse(res.text);
      expect(response.message).toBe(
        "You successfully registered! (response being updated)"
      );
    });

    //END OF POST REGISTER BLOCK
  });

  describe("POST /login", () => {
    it("should return 200", async () => {
      const register = await request(server).post("/auth/register").send({
        username: "abcd",
        password: "qwerty",
        email: "test@qwerty.com",
      });
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "abcd", password: "qwerty" });
      expect(res.status).toBe(200);
    });

    it('login message should be - "You successfully registered! (response being updated)"', async () => {
      const register = await request(server).post("/auth/register").send({
        username: "testbot",
        password: "qwerty",
        email: "test@qwertry.com",
      });
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "testbot", password: "qwerty" });
      let response = JSON.parse(res.text);
      expect(response.message).toBe("welcome, testbot");
    });

    it("should return 401", async () => {
      const register = await request(server)
        .post("/auth/register")
        .send({ username: "abcd", password: "qwerty", email: "hey@hey.com" });
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "abcd", password: "12345" });
      expect(res.status).toBe(401);
    });

    it("login error message should be - 'Either that user doesn't exist, or the table goofed up'", async () => {
      const register = await request(server).post("/auth/register").send({
        username: "testbot",
        password: "qwerty",
        email: "hey@hey.com",
      });
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "testbot", password: "12345" });

      let response = JSON.parse(res.text);
      expect(response.message).toBe("username or password incorrect");
    });
  });
});
