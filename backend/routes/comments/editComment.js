const {
  FORBIDDEN_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const {
  getCommentById,
  updateCommentById,
} = require("../../services/comment.service");

module.exports = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req.context;
    const { commentId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid parameters" });
    }

    const commentData = await getCommentById({ commentId });
    if (!commentData) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid commentId" });
    }

    const { createdBy } = commentData;
    if (createdBy.toString() !== userId.toString()) {
      return res
        .status(FORBIDDEN_STATUS)
        .json({ error: true, message: "You don't have permission" });
    }

    const latestComment = await updateCommentById({ commentId, comment });

    return res.json({ success: true, comment: latestComment });
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
