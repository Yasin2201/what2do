const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const Activity = require("../controllers/activity");

router.get("/activitys/:status", requireAuth, Activity.getActivitys);
router.get("/activity/:id", requireAuth, Activity.getOne);
router.post("/activitys", requireAuth, Activity.create);
router.delete("/activity/:id", requireAuth, Activity.delete);
router.put("/activity/complete/:id", requireAuth, Activity.updateStatusCompleted);
router.put("/activity/:id", requireAuth, Activity.update);

module.exports = router