const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const seed = require("./utils/seed");
const noteRoutes = require("./routes/note");

require("dotenv").config();
const MONGODB_CONNECTION_STRING =
  require("./utils/constants/db").MONGODB_CONNECTION_STRING;

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use(noteRoutes);

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
