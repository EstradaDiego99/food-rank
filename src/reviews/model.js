const { Schema, model } = require("mongoose");

const schema = new Schema({
  /** Id from the dish in this review. */
  dishId: {
    type: String,
    required: [true, "The dish id is necessary."],
  },

  /** Id from the user who creates this review. */
  userId: {
    type: String,
    required: [true, "The user who created the review is necessary."],
  },

  /** Message for the review. */
  reviewMessage: {
    type: String,
    required: [true, "The message for the review is necessary."],
  },
});

/** Particular dish belonging to a restaurant. */
const Review = model("Review", schema);

module.exports = Review;
