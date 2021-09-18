const { Schema, model } = require("mongoose");

const schema = new Schema({
  /** id related to the restaurant. */
  restaurantId: {
    type: String,
    required: [true, "The restaurant id is necessary."],
  },

  /** Name that will be displayed for the dish. */
  name: {
    type: String,
    required: [true, "The dish name is necessary."],
  },

  /** Numerical price using the currency. */
  price: {
    type: Number,
    required: false,
  },

  /** Currency used for the price. */
  currency: {
    type: String,
    required: false,
  },

  /** URL for the Google Cloud Instance where the picture is stored. */
  photoUrl: {
    type: String,
    required: [true, "The dish photo url is necessary."],
  },

  /** ELO value for the ranking all the dishes. */
  elo: {
    type: Number,
    default: 1400,
    required: [true, "The elo is necessary."],
  },

  /** Tags of the different categories the dish corresponds to. */
  tags: {
    type: [String],
    default: [],
    required: [true, "the tags are necessary"],
  },
});

/** Particular dish belonging to a restaurant. */
const Dish = model("Dish", schema);

module.exports = Dish;
