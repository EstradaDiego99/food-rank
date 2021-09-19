const router = require("express").Router();
const cors = require("cors");

const Review = require("./model");
const User = require("../users/model");
const { extraerMensajesError } = require("../utils/functions");

const { decodeToken } = require("../utils/jwt");

const ELO_BASE = 1400;

// CREATE
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};

  const { id: userId } = decodeToken(data.accessToken);
  data.userId = userId;
  const newReview = new Review(data);

  const user = await User.findOne({ _id: userId }).catch((err) => err);
  // if (!user.dishesELO) {
  //   user.dishesELO = { [data.dishId]: ELO_BASE };
  // } else {
  user.dishesELO.set(data.dishId, ELO_BASE);
  // }
  user.save();

  const resSave = await newReview.save().catch((err) => err);
  if (resSave instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resSave),
      msg: "There was an error saving the review.",
    });
  }
  return res.json({
    msg: "This review was saved correctly.",
  });
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Review.find(query)
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of reviewes." });
  }

  return res.json(resFind);
});

router.get("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resFind = await Review.findOne({ _id }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this Review." });
  }
  if (resFind === null) {
    return res.status(400).json({ msg: "No Review with this id was found." });
  }

  const objFind = resFind.toObject();
  return res.json(objFind);
});

// UPDATE
router.put("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const reviewToUpdate = await Review.findOne({ _id }).catch((err) => err);
  if (reviewToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this Review.",
    });
  }
  if (reviewToUpdate === null) {
    return res
      .status(400)
      .json({ msg: "No Review with this id was found was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    reviewToUpdate[key] = value;
  }
  const resUpdate = await reviewToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this Review.",
    });
  }

  return res.json("Review was successfuly updated.");
});

// DELETE
router.delete("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resDelete = await Review.findOneAndDelete({ _id }).catch((err) => err);
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing this Review." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This review was not found." });
  }

  return res.json({ msg: "Review successfully removed." });
});

module.exports = router;
