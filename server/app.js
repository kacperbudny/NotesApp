const express = require("express");
const mongoose = require("mongoose");

const seed = require("./utils/seed");

require("dotenv").config();
const MONGODB_CONNECTION_STRING = require("./utils/constants/db").MONGODB_CONNECTION_STRING;

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    seed();
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((err) => {
    console.error(err);
  });

