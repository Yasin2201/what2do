const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const Group = require("../controllers/group");

router.get("/group", requireAuth, Group.getAll)
router.get("/group/:id", requireAuth, Group.getOne)
router.post("/group/join", requireAuth, Group.joinGroup);
router.post("/group", requireAuth, Group.create);
router.delete("/group/:id", requireAuth, Group.delete);
// router.put("/group/:id", Group.update);  edit group func

module.exports = router