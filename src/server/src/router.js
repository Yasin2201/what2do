var express = require("express");
var router = express.Router();

var authRouter = require('./routes/authentication')
var groupRouter = require('./routes/group')

router.use("/auth", authRouter);
router.use(groupRouter);

module.exports = router;