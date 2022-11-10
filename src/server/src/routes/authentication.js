const express = require("express");
const router = express.Router();
const Authentication = require("../controllers/authentication");
const passport = require("passport");
require("../services/passport");

const requireSignIn = passport.authenticate("local", { session: false });

router.post("/login", requireSignIn, Authentication.login);
router.post("/signup", Authentication.signup);

module.exports = router