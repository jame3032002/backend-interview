const {
  FORBIDDEN_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const {
  getCommentById,
  deleteCommentById,
} = require("../../services/comment.service");

module.exports = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req.context;
    const { commentId } = req.params;

    const comment = await getCommentById({ commentId });
    if (!comment) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid commentId" });
    }

    const { createdBy } = comment;
    if (createdBy.toString() !== userId.toString()) {
      return res
        .status(FORBIDDEN_STATUS)
        .json({ error: true, message: "You don't have permission" });
    }

    await deleteCommentById({ commentId, userId });

    return res.json({ success: true });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
