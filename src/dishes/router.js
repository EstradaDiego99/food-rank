const router = require("express").Router();
const Dish = require("./model");
const cors = require("cors");

const { extraerMensajesError } = require("../utils/functions");

// CREATE
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};

  // Save Dish
  const newPlan = new Dish(data);
  const resSave = await newPlan.save().catch((err) => err);
  if (resSave instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resSave),
      msg: "There was an error saving the dish.",
    });
  }

  return res.json({
    msg: "The dish was saved correctly.",
  });
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Dish.find(query, { sort: { siglas: 1 } })
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res.status(400).json({ msg: "Hubo un error al obtener dishes." });
  }

  return res.json(resFind);
});

router.get("/:indexField", cors(), async (req, res) => {
  const { indexField } = req.params;
  const resFind = await Dish.findOne({ indexField }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this dish." });
  }
  if (resFind === null) {
    return res
      .status(400)
      .json({ msg: "No se encontró plan registrado con estas siglas." });
  }

  const objFind = resFind.toObject();
  return res.json(objFind);
});

// UPDATE
router.put("/:indexField", cors(), async (req, res) => {
  const { indexField } = req.params;
  const dishToUpdate = await Dish.findOne({ indexField }).catch((err) => err);
  if (dishToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this dish.",
    });
  }
  if (dishToUpdate === null) {
    return res.status(400).json({ msg: "No dish was found." });
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
router.delete("/:indexField", cors(), async (req, res) => {
  const { indexField } = req.params;
  const resDelete = await Dish.findOneAndDelete({ indexField }).catch(
    (err) => err
  );
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing the dish." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This dish was not found." });
  }

  return res.json({ msg: "Dish successfully removed." });
});

module.exports = router;
