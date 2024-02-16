const { authorizedToAccess } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", require("./getInterviews"));
router.get("/:interviewId", require("./getInterviewById"));
router.get("/:interviewId/histories", require("./getHistories"));
router.get("/:interviewId/comments", require("./getComments"));
router.post("/", authorizedToAccess, require("./addInterview"));
router.patch("/:interviewId", authorizedToAccess, require("./editInterview"));
router.patch(
  "/:interviewId/archive",
  authorizedToAccess,
  require("./editInterviewArchive")
);
router.post(
  "/:interviewId/comments",
  authorizedToAccess,
  require("./addComment")
);

module.exports = router;
