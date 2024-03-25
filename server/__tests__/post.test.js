const request = require("supertest");
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/posts", require("../routers/posts"));

const mockedPost = Post;
const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");

describe("Posts", () => {
  it("should verify authentication", async () => {
    const body = {};
    const headers = {
      // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
      // 'Content-Type': 'application/json',
    };
    const response = await request(app)
      .post("/api/posts/user/post")
      .set(headers)
      .send(body);
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Missing or invalid token");
  });

  it("should verify if user exist", async () => {
    const body = {};

    const headers = {
      Authorization: "Bearer token.dhsjd.qjsdiqsdioq",
      "Content-Type": "application/json",
    };

    jwt.verify.mockResolvedValue({ _id: "123456ZERT" });
    mockedUser.findById = jest.fn().mockResolvedValue(null);
    const response = await request(app)
      .post("/api/posts/user/post")
      .set(headers)
      .send(body);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should verify authentication with invalid token", async () => {
    const body = { title: "this is my post" };

    const headers = {
      Authorization: "Bearer token.dhsjd.qjsdiqsdioq",
      "Content-Type": "application/json",
    };

    jwt.verify.mockResolvedValue({ _id: "123456ZERT" });
    mockedUser.findById = jest.fn().mockResolvedValue({
      _id: "123456ZERT",
      email: "ouds@gmail.com",
      password: "12345678",
      active: true,
    });
    mockedPost.create = jest.fn().mockResolvedValue({
      title: "123456ZERT",
    });
    const response = await request(app)
      .post("/api/posts/user/post")
      .set(headers)
      .send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("123456ZERT");
  });
});
