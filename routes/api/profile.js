const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

//@route GET api/profile/me
//@desc Get current user profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        message: "There is no profile for this user"
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/profile
//@desc create/update user profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("location", "Location is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      website,
      location,
      skills,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (title) profileFields.title = title;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;

    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    //build social object

    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
          { useFindAndModify: false }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route GET api/profile/user/:user_id
//@desc Get profile by userid
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ message: "Profile does not exist" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
