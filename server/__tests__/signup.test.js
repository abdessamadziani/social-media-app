const request = require("supertest");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const sendMail = require("../utils/sendEmail");
const app = express();

app.use(express.json());
app.use("/api/users", require("../routers/users"));

// jest.mock("../models");
const mockedUser = User;

jest.mock("bcryptjs");
jest.mock("../utils/sendEmail");

jest.mock("jsonwebtoken");

describe("Register", () => {
  it("should verify that required fields are full", async () => {
    const body = {};
    const response = await request(app).post("/api/users/signup").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBeTruthy();
  });

  it("should return the email exist", async () => {
    const body = {
      fullname: "John Doe",
      username: "johndoe123",
      email: "johndoe@example.com",
      password: "Password123",
      bio: "Lorem ipsum",
      bdate: "1990-01-01",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({ _id: "rtyu" });
    const response = await request(app).post("/api/users/signup").send(body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exisits. Please sign in");
  });

  it("should register successfully", async () => {
    const body = {
      fullname: "John Doe",
      username: "johndoe123",
      email: "johndoe@example.com",
      password: "Password123",
      bio: "Lorem ipsum",
      bdate: "1990-01-01",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue(null);
    mockedUser.create = jest.fn().mockResolvedValue({
      fullname: "John Doe",
      username: "johndoe123",
      email: "johndoe@example.com",
      password: "Password123",
      bio: "Lorem ipsum",
      bdate: "1990-01-01",
    });
    jwt.sign.mockResolvedValue("tyuizert.rtyui.qertygu");
    sendMail.mockResolvedValue(true);
    const response = await request(app).post("/api/users/signup").send(body);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "User registration successful please verify your email"
    );
  });

  // it("should verify if the account active", async () => {
  //   const body = {
  //     email : 'osiima@gledj.cdu',
  //     password: "password123",
  //   };
  //   mockedUser.findOne = jest.fn().mockResolvedValue({
  //     _id: '1234567',
  //     email :'ouds@gmail.com',
  //     password: '12345678',
  //     active : false
  //   });
  //   bcrypt.compare.mockResolvedValue(true);
  //   const response = await request(app).post("/api/users/signup").send(body);
  //   expect(response.status).toBe(401);
  //   expect(response.body.error).toBe('Sorry you need to activate your aacount first check your email');
  // });

  // it("should login successfully", async () => {
  //   const body = {
  //     email : 'osiima@gledj.cdu',
  //     password: "password123",
  //   };
  //   mockedUser.findOne = jest.fn().mockResolvedValue({
  //     _id: '1234567',
  //     email :'ouds@gmail.com',
  //     password: '12345678',
  //     active : true
  //   });
  //   bcrypt.compare.mockResolvedValue(true);
  //   jwt.sign.mockReturnValue("mockedToken");
  //   const response = await request(app).post("/api/users/signup").send(body);
  //   expect(response.status).toBe(200);
  //   expect(response.body.token).toBe('mockedToken');
  // });
});
