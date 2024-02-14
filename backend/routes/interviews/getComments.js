const mongoose = require("mongoose");

const { INTERNAL_SERVER_ERROR } = require("../../config/statusMessage");
const { getCommentsByInterviewId } = require("../../services/comment.service");

module.exports = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const comments = await getCommentsByInterviewId({
      interviewId: new mongoose.Types.ObjectId(interviewId),
    });

    return res.json({ success: true, comments });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
