const { authorizedToAccess } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/", authorizedToAccess, require("./getInterviews"));
router.get("/:interviewId", authorizedToAccess, require("./getInterviewById"));
router.get(
  "/:interviewId/histories",
  authorizedToAccess,
  require("./getHistories")
);
router.get(
  "/:interviewId/comments",
  authorizedToAccess,
  require("./getComments")
);
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
