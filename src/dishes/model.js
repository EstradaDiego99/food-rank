const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new Schema({
  /** Campo de índice, valor único para cada elemento. */
  indexField: {
    type: String,
    index: true,
    required: [true, "The index field is necessary."],
    unique: true,
  },

  /** id related to the restaurant. */
  restaurantId: {
    type: String,
    required: [true, "The restaurant id is necessary."],
  },

  /** dish name. */
  name: {
    type: String,
    required: [true, "The dish name is necessary."],
  },

  /** dish price */
  price: {
    type: Number,
    required: false,
  },

  /** dish pictures */
  photoUrl: {
    type: String,
    required: [true, "The dish name is necessary."],
  },

  /** elo value for the ranking */
  elo: {
    type: Number,
    default: 1400,
    required: [true, "The elo is necessary."],
  },

  /** tags of the dish */
  tags: {
    type: [String],
    default: [],
    required: [true, "the tags are necessary"],
  },

 

});

const uniqueErrors = {
  indexField:
    "Ya existe otro post con este identificador. Aquí colocas el mensaje deseado.",
};
schema.plugin(uniqueValidator, { message: ({ path }) => uniqueErrors[path] });

/** Template entity for this example. Must be camelcase singular. */
const Dishes = model("Dishes", schema);

module.exports = Dishes;
