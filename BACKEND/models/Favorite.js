const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  //   isLikes: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Blog",
  //     },
  //   ],
  //   Favorite: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  fovoriteBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Favorite", FavoriteSchema);
