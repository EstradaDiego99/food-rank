const router = require("express").Router();
const User = require("./model.js");
const cors = require("cors");
const bcrypt = require("bcrypt-node");
const jwt = require("../utils/jwt");

const Dish = require("../dishes/model");
const Restaurant = require("../restaurants/model");
const { decodeToken } = require("../utils/jwt");
const { extraerMensajesError } = require("../utils/functions");

function extractFavoriteDishes(userObj) {
  const sortedEloDishes = new Map(
    [...userObj.dishesELO.entries()].sort((a, b) => b[1] - a[1])
  );
  if (sortedEloDishes.size === 0) {
    return [];
  }
  if (sortedEloDishes.size === 1) {
    const [a] = sortedEloDishes.keys();
    return [a];
  }
  if (sortedEloDishes.size === 2) {
    const [a, b] = sortedEloDishes.keys();
    return [a, b];
  }
  const [a, b, c] = sortedEloDishes.keys();
  return [a, b, c];
}

// CREATE - SIGN UP
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};
  const { name, email, password, repeatPassword, dishesELO } = req.body;
  const user = new User();
  user.name = name;
  user.email = email.toLowerCase();
  user.dishesELO = dishesELO;
  // Save User
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ message: "Las contraseñas tienen que ser iguales" });
    } else {
      await bcrypt.hash(password, null, null, async function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          user.password = hash;
          await user.save((err, userStored) => {
            if (err) {
              res.status(500).json({
                message: "There was an error",
              });
            } else {
              if (!userStored) {
                res
                  .status(404)
                  .send({ message: "There was an error creating the user." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
});
// SIGN - IN
router.post("/sign-in", cors(), async (req, res) => {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "User not found" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Server error" });
          } else if (!check) {
            res.status(404).send({ message: "Incorrect password" });
          } else {
            res.status(200).send({
              accessToken: jwt.createAccessToken(userStored),
              refreshToken: jwt.createRefreshToken(userStored),
            });
          }
        });
      }
    }
  });
});
// READ
/*
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Restaurant.find(query, { sort: { siglas: 1 } })
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error when obtaining restaurants." });
  }

  return res.json(resFind);
});
*/
// READ
router.get("/recommendedDishes", cors(), async (req, res) => {
  const { query = {} } = req;
  const userId = query.token ? decodeToken(query.token).id : "";

  const userObj = await User.findOne({ _id: userId }).catch((err) => err);
  if (userObj instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of dishes." });
  }

  const biggestFood = extractFavoriteDishes(userObj);

  const recommendations = new Set();

  const users = await User.find().catch((err) => err);
  for (const otherUserObj of users) {
    const favorites = extractFavoriteDishes(otherUserObj);
    for (const dish of biggestFood) {
      if (favorites.includes(dish)) {
        favorites.forEach((item) => {
          recommendations.add(item);
        });
        break;
      }
    }
  }

  // Removing places already visited by user
  for (const dish of recommendations) {
    if (userObj.dishesELO.has(dish)) {
      recommendations.delete(dish);
    }
  }

  let dishRecommendations = await Dish.find({
    _id: { $in: Array.from(recommendations) },
  })
    .lean()
    .catch((err) => err);

  for (const dish of dishRecommendations) {
    const restObj = await Restaurant.findOne({ _id: dish.restaurantId })
      .lean()
      .catch((err) => err);
    dish.restaurant = restObj;
  }

  return res.json(dishRecommendations || []);
});

router.get("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resFind = await User.findOne({ _id }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading this user." });
  }
  if (resFind === null) {
    return res.status(400).json({ msg: "No user with this id was found." });
  }

  const objFind = resFind.toObject();
  return res.json(objFind);
});

// Update user
router.put("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const restToUpdate = await User.findOne({ _id }).catch((err) => err);
  if (restToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error updating this user.",
    });
  }
  if (restToUpdate === null) {
    return res.status(400).json({ msg: "No user was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    if (key === "password") {
      await bcrypt.hash(value, null, null, function (err, hash) {
        restToUpdate["password"] = hash;
      });
    }
    restToUpdate[key] = value;
  }
  const resUpdate = await restToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this user.",
    });
  }

  return res.json("User was successfuly updated.");
});

// DELETE
router.delete("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resDelete = await User.findOneAndDelete({ _id }).catch((err) => err);
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing the user." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This user was not found." });
  }

  return res.json({ msg: "User successfully removed." });
});

module.exports = router;
