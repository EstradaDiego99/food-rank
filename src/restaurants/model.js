const { Schema, model } = require("mongoose");

const schema = new Schema({
  /** Name of the restaurant. */
  name: {
    type: String,
    required: [true, "The name is necessary."],
  },

  /** Refers to the user _id that created this restaurant. */
  owner: {
    type: String,
    required: false,
  },

  /** "business_id" by the yelp dataset. */
  yelpBusinessId: {
    type: String,
    required: false,
  },

  /** Photographs from the yelp database */
  yelpPhotosUrl: {
    type: [String],
    default: [],
    required: false,
  },

  /** Categories in which this restaurant might fit in. */
  tags: {
    type: [String],
    default: [],
    required: false,
  },

  /** Address of the restaurant (Including number). */
  address: {
    type: String,
    required: false,
  },

  /** City in which the restaurant is in. */
  city: {
    type: String,
    required: false,
  },

  /** City in which the restaurant is in. */
  state: {
    type: String,
    required: false,
  },

  /** Postal code of the address of the restaurant. */
  postalCode: {
    type: String,
    required: false,
  },
});

/** Template entity for this example. Must be camelcase singular. */
const Restaurant = model("Restaurant", schema);

module.exports = Restaurant;
