const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const User = require("../controllers/user");

router.get("/me", requireAuth, User.me);

module.exports = router