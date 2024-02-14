const { authorizedToAccess } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.delete("/:commentId", authorizedToAccess, require("./deleteComment"));

module.exports = router;
