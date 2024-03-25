const { body } = require("express-validator");

module.exports = [
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().notEmpty().withMessage("Email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  body("bio").notEmpty().withMessage("Bio is required"),
  body("bdate").notEmpty().withMessage("Birth date is required"),
];