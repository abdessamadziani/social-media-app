const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle token verification error
      return res.status(401).json({ error: "Token verification failed" });
    }

    // Use the decoded object to get the user's ID
    const userId = decoded._id;

    User.findById(userId)
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.profile = user;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ error: "Internal server error" });
      });
  });
};





exports.isAdmin= (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle token verification error
      return res.status(401).json({ error: "Token verification failed" });
    }

    // Use the decoded object to get the user's ID
    const userId = decoded._id;

    User.findById(userId)
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        if (!user.role !== 'admin') {
          return res.status(404).json({ error: "you dont have access this is only for admin" });
        }

        // req.profile = user;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ error: "Internal server error" });
      });
  });
};