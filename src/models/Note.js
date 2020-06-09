const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }, 
    estado : {
      type: String,
      default: "por hacer"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Note", NoteSchema);
