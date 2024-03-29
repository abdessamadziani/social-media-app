require("dotenv").config();
const express = require("express");
//  const mongoose = require('mongoose')
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
const usersRoutes = require("./routers/users");
const postsRoutes = require("./routers/posts");

app.use(express.json());
 app.use(cors());
// app.options('*', cors());

app.use(cookieParser());
connectDB();
app.get("/", (req, res) => {
  res.send("Server Side");
});

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);



// app.get('/api/posts/api/data', (req, res) => {
//   res.json({ message: 'Data retrieved successfully', data: { name: 'John', age: 30 } });
// });



// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log("Server is running on port ", port);
// });

const port = process.env.NODE_ENV === 'test' ? 5001 : 5000;
app.listen(port, () => {
  console.log("Server is running on port ", port);
});



module.exports = app;
