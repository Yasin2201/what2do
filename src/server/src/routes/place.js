const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const Place = require("../controllers/place");

router.get("/places", requireAuth, Place.getPlaces);

module.exports = router