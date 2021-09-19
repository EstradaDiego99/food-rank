const router = require("express").Router();
const Restaurant = require("./model");
const Dishes = require("../dishes/model");
const cors = require("cors");

const { extraerMensajesError } = require("../utils/functions");

// CREATE
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};

  // Save Restaurant
  const newRestaurant = new Restaurant(data);
  const resSave = await newRestaurant.save().catch((err) => err);
  if (resSave instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resSave),
      msg: "There was an error saving the restaurant.",
    });
  }

  return res.json({
    msg: "The restaurant was saved correctly.",
  });
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Restaurant.find(query)
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
  
  const resDishes = await Dishes.find({ restaurantId : {_id} }).catch((err) => err);

  return res.json({
    resFind,
    resDishes,
  });
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
});

module.exports = router;
