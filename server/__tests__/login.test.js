const request = require("supertest");
const User =  require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/users", require('../routers/users'));

// jest.mock("../models");
const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");


describe("Authentication", () => {
  it("should verify that required fields are full", async () => {
    const body = {};
    const response = await request(app).post("/api/users/signin").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBeTruthy();
  });

  it("should return the user not found", async () => {
    const body = {
      email: 'fakeemail@gmail.com',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue(null);
    const response = await request(app).post("/api/users/signin").send(body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("User not found");
  });

  it("should verify that the password is incorrect", async () => {
    const body = {
      email : 'osiima@gledj.cdu',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({
      _id: '1234567',
      email :'ouds@gmail.com',
      password: '12345678',
    });
    bcrypt.compare.mockResolvedValue(false);
    const response = await request(app).post("/api/users/signin").send(body);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Email and Password do not match');
  });

  it("should verify if the account active", async () => {
    const body = {
      email : 'osiima@gledj.cdu',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({
      _id: '1234567',
      email :'ouds@gmail.com',
      password: '12345678',
      active : false
    });
    bcrypt.compare.mockResolvedValue(true);
    const response = await request(app).post("/api/users/signin").send(body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Sorry you need to activate your aacount first check your email');
  });

  it("should login successfully", async () => {
    const body = {
      email : 'osiima@gledj.cdu',
      password: "password123",
    };
    mockedUser.findOne = jest.fn().mockResolvedValue({
      _id: '1234567',
      email :'ouds@gmail.com',
      password: '12345678',
      active : true
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockedToken");
    const response = await request(app).post("/api/users/signin").send(body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });
});