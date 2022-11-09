var express = require("express");
var router = express.Router();
const Vote = require("../controllers/vote");

router.post("/vote/:id", Vote.create)

module.exports = router