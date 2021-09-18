const router = require("express").Router();
const User = require("./model.js");
const cors = require("cors");
const bcrypt = require("bcrypt-node");
const { extraerMensajesError } = require("../utils/functions");

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

router.get("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resFind = await Restaurant.findOne({ _id }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this restaurant." });
  }
  if (resFind === null) {
    return res
      .status(400)
      .json({ msg: "No restaurant with this id was found." });
  }

  const objFind = resFind.toObject();
  return res.json(objFind);
});

// UPDATE
router.put("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const restToUpdate = await Restaurant.findOne({ _id }).catch((err) => err);
  if (restToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this restaurant.",
    });
  }
  if (restToUpdate === null) {
    return res.status(400).json({ msg: "No restaurant was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    restToUpdate[key] = value;
  }
  const resUpdate = await restToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this restaurant.",
    });
  }

  return res.json("Restaurant was successfuly updated.");
});

// DELETE
router.delete("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resDelete = await Restaurant.findOneAndDelete({ _id }).catch(
    (err) => err
  );
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing the restaurant." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This restaurant was not found." });
  }

  return res.json({ msg: "Restaurant successfully removed." });
});*/

module.exports = router;
