const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/courier");

const app = express();

// DataBase Handling
mongoose
  .connect("mongodb://127.0.0.1:27017/courier_data")
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Failed.");
  });

// BodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Static Database
app.use("/images", express.static(path.join("backend/images")));

// The CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requestes-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, OPTIONS, DELETE"
  );
  next();
});

// Route Handling
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

module.exports = app;
