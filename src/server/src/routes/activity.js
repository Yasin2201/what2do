var express = require("express");
var router = express.Router();
const Activity = require("../controllers/activity");

router.post("/activity", Activity.create);
router.delete("/activity/:id", Activity.delete);
router.put("/activity/:id", Activity.update);

module.exports = router