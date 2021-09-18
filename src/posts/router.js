const router = require("express").Router();
const Post = require("./model");
const cors = require("cors");

const { extraerMensajesError } = require("../utils/functions");

// CREATE
router.post("/", cors(), async (req, res) => {
  const data = req.body || {};

  // Save Post
  const newPlan = new Post(data);
  const resSave = await newPlan.save().catch((err) => err);
  if (resSave instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resSave),
      msg: "There was an error saving the post.",
    });
  }

  return res.json({
    msg: "The post was saved correctly.",
  });
});

// READ
router.get("/", cors(), async (req, res) => {
  const { query = {} } = req;
  const resFind = await Post.find(query, { sort: { siglas: 1 } })
    .lean()
    .catch((err) => err);
  if (resFind instanceof Error) {
    return res.status(400).json({ msg: "Hubo un error al obtener posts." });
  }

  return res.json(resFind);
});

router.get("/:indexField", cors(), async (req, res) => {
  const { indexField } = req.params;
  const resFind = await Post.findOne({ indexField }).catch((err) => err);
  if (resFind instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error reading from this post." });
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
  const postToUpdate = await Post.findOne({ indexField }).catch((err) => err);
  if (postToUpdate instanceof Error) {
    return res.status(400).json({
      msg: "There was an error looking for this post.",
    });
  }
  if (postToUpdate === null) {
    return res.status(400).json({ msg: "No post was found." });
  }

  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    postToUpdate[key] = value;
  }
  const resUpdate = await postToUpdate.save().catch((err) => err);
  if (resUpdate instanceof Error) {
    return res.status(400).json({
      err: extraerMensajesError(resUpdate),
      msg: "There was an error when trying to update this post.",
    });
  }

  return res.json("Post was successfuly updated.");
});

// DELETE
router.delete("/:indexField", cors(), async (req, res) => {
  const { indexField } = req.params;
  const resDelete = await Post.findOneAndDelete({ indexField }).catch(
    (err) => err
  );
  if (resDelete instanceof Error) {
    return res
      .status(400)
      .json({ msg: "There was an error removing the post." });
  }
  if (resDelete === null) {
    return res.status(400).json({ msg: "This post was not found." });
  }

  return res.json({ msg: "Post successfully removed." });
});

module.exports = router;
