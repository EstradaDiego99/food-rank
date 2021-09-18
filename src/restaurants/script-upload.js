const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const Restaurant = require("./model");
const MAX_RESTAURANTS = 100;

function shouldAddRestaurant(obj) {
  if (obj.city !== "Vancouver") return false;
  if (obj.state !== "BC") return false;
  if (!obj.categories) return false;
  if (obj.is_open === 0) return false;
  return obj.categories.split(", ").includes("Restaurants");
}

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const readLine = require("readline");
    const f = require("fs");
    var file = path.join(__dirname, "dataset.json");
    var rl = readLine.createInterface({
      input: f.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });

    let counter = 0;
    rl.on("line", function (text) {
      const obj = JSON.parse(text);
      const {
        business_id,
        name,
        address,
        city,
        state,
        postal_code,
        categories,
      } = obj;
      if (counter < MAX_RESTAURANTS && shouldAddRestaurant(obj)) {
        const newRestaurant = new Restaurant({
          name,
          yelpBusinessId: business_id,
          tags: categories.split(", "),
          address,
          city,
          state,
          postalCode: postal_code,
        });
        newRestaurant.save();
        counter += 1;
      }
    });
  })
  .catch((err) => console.log(err));
