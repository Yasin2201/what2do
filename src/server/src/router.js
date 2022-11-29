const express = require("express");
const router = express.Router();

const authRouter = require('./routes/authentication')
const groupRouter = require('./routes/group')
const activityRouter = require('./routes/activity')
const voteRouter = require("./routes/vote")
const userRouter = require("./routes/user")
const placeRouter = require("./routes/place")

router.use("/auth", authRouter);
router.use(groupRouter);
router.use(activityRouter);
router.use(voteRouter);
router.use(userRouter);
router.use(placeRouter);

module.exports = router;