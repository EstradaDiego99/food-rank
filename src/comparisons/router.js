const router = require("express").Router();
const cors = require("cors");

const Comparison = require("./model");
const { extraerMensajesError } = require("../utils/functions");

const { decodeToken } = require("../utils/jwt");

// CREATE
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};

  const { id } = decodeToken(data.accessToken);
  data.userId = id;
  const newComparison = new Comparison(data);
  const resSave = await newComparison.save().catch((err) => err);
  if (resSave instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resSave),
      msg: "There was an error saving the Comparison.",
    });
  }
  return res.json({
    msg: "This Comparison was saved correctly.",
  });
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Comparison.find(query)
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error obtaining list of Comparisones." });
  }

  return res.json(resFind);
});

router.get("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resFind = await Comparison.findOne({ _id }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this Comparison." });
  }
  if (resFind === null) {
    return res
      .status(400)
      .json({ msg: "No Comparison with this id was found." });
  }

  const objFind = resFind.toObject();
  return res.json(objFind);
});

// UPDATE
router.put("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const ComparisonToUpdate = await Comparison.findOne({ _id }).catch(
    (err) => err
  );
  if (ComparisonToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this Comparison.",
    });
  }
  if (ComparisonToUpdate === null) {
    return res
      .status(400)
      .json({ msg: "No Comparison with this id was found was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    ComparisonToUpdate[key] = value;
  }
  const resUpdate = await ComparisonToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this Comparison.",
    });
  }

  return res.json("Comparison was successfuly updated.");
});

// DELETE
router.delete("/:_id", cors(), async (req, res) => {
  const { _id } = req.params;
  const resDelete = await Comparison.findOneAndDelete({ _id }).catch(
    (err) => err
  );
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing this Comparison." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This Comparison was not found." });
  }

  return res.json({ msg: "Comparison successfully removed." });
});

module.exports = router;
