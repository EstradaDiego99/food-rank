// Script to generate json containing only the photo_ids used by the restaurants in the database

const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const Restaurant = require("./model");

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const rest_set = new Set();
    const restaurants = await Restaurant.find({}, "-_id yelpBusinessId");
    for (const r of restaurants) {
      rest_set.add(r.yelpBusinessId);
    }

    const readLine = require("readline");
    const fs = require("fs");
    var file = path.join(__dirname, "photos.json");
    var outputFile = path.join(__dirname, "photo_ids.json");

    var rl = readLine.createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });

    const photo_ids = [];
    rl.on("line", async (text) => {
      const obj = JSON.parse(text);
      const { photo_id, business_id } = obj;
      if (rest_set.has(business_id)) {
        photo_ids.push(photo_id);
        const restaurant = await Restaurant.findOne({
          yelpBusinessId: business_id,
        });
        const photo_url = `https://storage.googleapis.com/food-rank-yelp-photos/${photo_id}.jpg`;
        if (!restaurant.yelpPhotosUrl.includes(photo_url)) {
          restaurant.yelpPhotosUrl.push(photo_url);
        }
        restaurant.save();
      }
    });

    rl.on("close", function () {
      console.log(photo_ids);
      var json = JSON.stringify(photo_ids);
      fs.writeFile(outputFile, json, "utf8", () => {});
      console.log("Done");
    });
  })
  .catch((err) => console.log(err));
