var express = require("express");
var router = express.Router();
const Group = require("../controllers/group");

router.get("/group", Group.getAll)
router.get("/group/:id", Group.getOne)
router.post("/group", Group.create);
router.delete("/group/:id", Group.delete);
router.put("/group/:id", Group.update);
router.put("/group/join/:id", Group.joinGroup);

module.exports = router