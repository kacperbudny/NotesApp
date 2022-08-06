/* eslint-disable no-unused-vars */

const express = require("express");
const mongoose = require("mongoose");
const seed = require("./utils/seed/seed");
const noteRoutes = require("./routes/note");
const authRoutes = require("./routes/auth");

require("dotenv").config();
const MONGODB_CONNECTION_STRING =
  require("./utils/constants/db").MONGODB_CONNECTION_STRING;

const app = express();
const port = 8080;

app.use(express.json());

app.use(noteRoutes);
app.use(authRoutes);

app.use((error, req, res, _) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
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
