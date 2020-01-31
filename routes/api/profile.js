const express = require("express");
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
      check("Title", "title is required")
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
  (req, res) => {
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
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;
    if (youtube) profileFields.youtube = youtube;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    console.log(profileFields.skills);
    res.send("Hello");
  }
);

module.exports = router;
