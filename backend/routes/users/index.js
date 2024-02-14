const router = require("express").Router();

router.post("/", require("./register"));
router.post("/login", require("./login"));

module.exports = router;
