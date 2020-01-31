const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
//@route POST api/posts
//@desc create post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is required".not().isEmpty())]],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json()[{ errores: errors.array }];
    }

    const user = await;
  }
);

module.exports = router;
