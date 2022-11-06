var express = require("express");
var router = express.Router();

var authRouter = require('./routes/authentication')

router.use("/auth", authRouter);

module.exports = router;