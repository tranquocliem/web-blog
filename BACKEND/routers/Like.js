const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const Blog = require("../models/Blog");
const Like = require("../models/Like");
const DisLike = require("../models/DisLike");

userRouter.post(
  "/upLike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { userId: req.body.userId, blogId: req.body.blogId };
    const like = new Like(variable);

    like.save((err, likeResult) => {
      if (err) return res.json({ success: false, err });

      //truong hop nut user nay da dislike r nen can tru di
      DisLike.findOneAndDelete(variable).exec((err, disLikeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      });
    });
  }
);

userRouter.post(
  "/unLike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { userId: req.body.userId, blogId: req.body.blogId };

    Like.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  }
);

userRouter.post(
  "/upDisLike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { userId: req.body.userId, blogId: req.body.blogId };
    const disLike = new DisLike(variable);

    disLike.save((err, dislikeResult) => {
      if (err) return res.json({ success: false, err });
      //truong hop user nay da like r nen can tru di
      Like.findOneAndDelete(variable).exec((err, likeResult) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      });
    });
  }
);

userRouter.post(
  "/unDisLike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { userId: req.body.userId, blogId: req.body.blogId };

    DisLike.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  }
);

userRouter.post(
  "/getLikes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { blogId: req.body.blogId };
    Like.find(variable).exec((err, likes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    });
  }
);

userRouter.post(
  "/getDisLikes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { blogId: req.body.blogId };
    DisLike.find(variable).exec((err, disLikes) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, disLikes });
    });
  }
);

userRouter.post(
  "/getBlogByLike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let variable = { userId: req.body.userId };
    Like.find(variable)
      .populate("blogId")
      .exec((err, blogLike) => {
        if (err) return res.json({ success: false, err });
        return res.json({
          success: true,
          blogLike,
        });
      });
  }
);

module.exports = userRouter;
