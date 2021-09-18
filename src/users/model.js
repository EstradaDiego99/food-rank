const { Schema, model } = require("mongoose");

const schema = new Schema({
  /** Name of the user. */
  name: {
    type: String,
    required: [true, "The name is necessary."],
  },

  /** Refers to the user email registration. */
  email: {
    type: String,
    required: [true, "The email is necessary."],
    unique: true,
  },

  /** Hash of the user password. */
  password: {
    type: String,
    required: [true, "The password hash is necessary."],
  },

  /** ELO for each dish for this particular user. */
  dishesELO: {
    type: Map, // { "61459a71cd9e5c1b2543069b":1456}
    of: Number,
    required: false,
  },
});

/** Mongoose model for user. */
const User = model("User", schema);

module.exports = User;
