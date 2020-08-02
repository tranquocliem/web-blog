const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 20,
    },
    title: {
      type: String,
      required: true,
      minlength: 10,
    },
    color:{
      type: String,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
