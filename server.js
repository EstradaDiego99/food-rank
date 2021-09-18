const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database connected successfully"))
  .catch((err) => console.log(err));

const helloRouter = require("./src/hello/router");
app.use("/api/hello", helloRouter);

const restaurantsRouter = require("./src/restaurants/router");
app.use("/api/restaurants", restaurantsRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
