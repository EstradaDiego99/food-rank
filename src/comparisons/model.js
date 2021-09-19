const { Schema, model } = require("mongoose");

const schema = new Schema({
  /** ID for the dish */
  dishA: {
    type: String,
    required: [true, "The dishes ID is necessary."],
  },

  /** Score (0, 0.25, 0.5, 0.75, 1) for dish A */
  dishAScore: {
    type: Number,
    required: [true, "Both dishes are necessary for a comparison."],
  },

  /** ID for the dish */
  dishB: {
    type: String,
    required: [true, "The dishes ID is necessary."],
  },

  /** Score (0, 0.25, 0.5, 0.75, 1) for dish B */
  dishBScore: {
    type: Number,
    required: [true, "Both dishes are necessary for a comparison."],
  },

  /** Message for why the comparison is as it is */
  comparisonMessage: {
    type: Number,
    required: false,
  },

  /** Id from the user who creates this review. */
  userId: {
    type: String,
    required: [true, "The user who created the review is necessary."],
  },
});

// dishA + dishB = 1

/** A comparison between two dishes. */
const Comparison = model("Comparison", schema);

module.exports = Comparison;
