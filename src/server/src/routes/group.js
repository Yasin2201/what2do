var express = require("express");
var router = express.Router();
const Group = require("../controllers/group");

router.post("/group", Group.create);
router.delete("/group/:id", Group.delete);
router.put("/group/:id", Group.update);

module.exports = router