const router = require("express").Router();
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");

const Dish = require("./model");
const Review = require("../reviews/model");
const User = require("../users/model");
const Comparison = require("../comparisons/model");
const Restaurant = require("../restaurants/model");
const { extraerMensajesError } = require("../utils/functions");
const { decodeToken } = require("../utils/jwt");

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 128 * 1024 * 1024, // no larger than 128Mb, you can change as needed.
  },
});

// CREATE
router.post("/", cors(), multer.single("photoFile"), async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({
      msg: "No file was included.",
    });
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => next(err));
  blobStream.on("finish", async () => {
    const data = req.body || {};
    data.photoUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    data.tags = data.tags.split(",");
    const newDish = new Dish(data);
    const resSave = await newDish.save().catch((err) => err);
    if (resSave instanceof Error) {
      return res.status(400).json({
        err: extraerMensajesError(resSave),
        msg: "There was an error saving the dish.",
      });
    }
    return res.json({
      restaurantId: resSave._id,
      msg: "This dish was saved correctly.",
    });
  });
  blobStream.end(req.file.buffer);
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Dish.find(query)
    .sort({ elo: "desc" })
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of dishes." });
  }

  return res.json(resFind);
});

// READ
router.get("/comparisonReviews", cors(), async (req, res) => {
  const { query = {} } = req;
  const { dishA, dishB } = query;
  const comparisonReviews = [];

  let comparisons = await Comparison.find({ dishA, dishB })
    .lean()
    .catch((err) => err);
  if (comparisons instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of dishes." });
  }

  for (const comparison of comparisons) {
    const reviewA = await Review.findOne({
      userId: comparison.userId,
      dishId: comparison.dishA,
    })
      .lean()
      .catch((err) => err);
    if (!reviewA) continue;
    comparison.reviewA = reviewA.reviewMessage;

    const reviewB = await Review.findOne({
      userId: comparison.userId,
      dishId: comparison.dishB,
    })
      .lean()
      .catch((err) => err);
    if (!reviewB) continue;
    comparison.reviewB = reviewB.reviewMessage;

    comparisonReviews.push(comparison);
  }

  comparisons = await Comparison.find({ dishA: dishB, dishB: dishA })
    .lean()
    .catch((err) => err);
  if (comparisons instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of dishes." });
  }

  for (const comparison of comparisons) {
    const auxScore = comparison.dishAScore;
    comparison.dishAScore = comparison.dishBScore;
    comparison.dishBScore = auxScore;

    const auxDish = comparison.dishA;
    comparison.dishA = comparison.dishB;
    comparison.dishB = auxDish;

    const reviewA = await Review.findOne({
      userId: comparison.userId,
      dishId: comparison.dishA,
    })
      .lean()
      .catch((err) => err);
    if (!reviewA) continue;
    comparison.reviewA = reviewA.reviewMessage;

    const reviewB = await Review.findOne({
      userId: comparison.userId,
      dishId: comparison.dishB,
    })
      .lean()
      .catch((err) => err);
    if (!reviewB) continue;
    comparison.reviewB = reviewB.reviewMessage;

    comparisonReviews.push(comparison);
  }

  const dishAObj = await Dish.findOne({ _id: dishA })
    .lean()
    .catch((err) => err);
  const dishBObj = await Dish.findOne({ _id: dishB })
    .lean()
    .catch((err) => err);

  const restAObj = await Restaurant.findOne({ _id: dishAObj.restaurantId })
    .lean()
    .catch((err) => err);
  const restBObj = await Restaurant.findOne({ _id: dishBObj.restaurantId })
    .lean()
    .catch((err) => err);

  return res.json({
    comparisonReviews,
    dishAObj,
    dishBObj,
    restAObj,
    restBObj,
  });
});

router.get("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const { query = {} } = req;
  const userId = query.token ? decodeToken(query.token).id : "";

  const resFind = await Dish.findOne({ _id })
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this dish." });
  }
  if (resFind === null) {
    return res.status(400).json({ msg: "No dish with this id was found." });
  }

  const reviews = await Review.find({ dishId: _id })
    .lean()
    .catch((err) => err);
  for (const r of reviews) {
    const userNameObj = await User.findOne({ _id: r.userId }, "-_id name")
      .lean()
      .catch((err) => err);
    r.userName = userNameObj?.name;
  }

  const reviewedRestaurantsObj = await Review.find({ userId: userId }, "dishId")
    .lean()
    .catch((err) => err);
  const reviewedRestaurants = reviewedRestaurantsObj.map((r) => r.dishId);

  const similarDishes = await Dish.find({
    _id: { $ne: _id, $in: reviewedRestaurants },
    tags: { $in: resFind.tags },
  })
    .lean()
    .catch((err) => err);
  return res.json({
    objDish: resFind,
    similarDishes,
    reviews,
  });
});

// UPDATE
router.put("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const dishToUpdate = await Dish.findOne({ _id }).catch((err) => err);
  if (dishToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this dish.",
    });
  }
  if (dishToUpdate === null) {
    return res
      .status(400)
      .json({ msg: "No dish with this id was found was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    dishToUpdate[key] = value;
  }
  const resUpdate = await dishToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this dish.",
    });
  }

  return res.json("Dish was successfuly updated.");
});

// DELETE
router.delete("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resDelete = await Dish.findOneAndDelete({ _id }).catch((err) => err);
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing this dish." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This dish was not found." });
  }

  return res.json({ msg: "Dish successfully removed." });
});

module.exports = router;
