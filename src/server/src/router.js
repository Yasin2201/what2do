var express = require("express");
var router = express.Router();

var authRouter = require('./routes/authentication')
var groupRouter = require('./routes/group')
const activityRouter = require('./routes/activity')
const voteRouter = require("./routes/vote")

router.use("/auth", authRouter);
router.use(groupRouter);
router.use(activityRouter);
router.use(voteRouter);

module.exports = router;