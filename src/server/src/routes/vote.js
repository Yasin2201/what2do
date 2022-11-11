const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const Vote = require("../controllers/vote");

router.post("/vote/:id", requireAuth, Vote.create)

module.exports = router