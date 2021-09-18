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

  /** Campo de tipo booleano. */
  booleanField: {
    type: Boolean,
    default: true,
    required: [true, "The boolean field is necessary."],
  },

  /** Campo de tipo numérico. */
  numberField: {
    type: Number,
    required: [true, "The number field is necessary."],
  },

  /** Campo de tipo string. */
  stringField: {
    type: String,
    required: [true, "The string field is necessary."],
  },

  /** Field of type date. */
  dateField: {
    type: Date,
    required: [true, "The date field is necessary."],
  },
});

const uniqueErrors = {
  indexField:
    "Ya existe otro post con este identificador. Aquí colocas el mensaje deseado.",
};
schema.plugin(uniqueValidator, { message: ({ path }) => uniqueErrors[path] });

/** Template entity for this example. Must be camelcase singular. */
const Posts = model("Posts", schema);

module.exports = Posts;
