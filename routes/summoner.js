const express = require("express");
const router = express.Router();

const { getUser } = require("../controllers/summoners");

router.get("/:name", getUser);
module.exports = router;
