const mongoose = require("mongoose");

const {
  CREATE_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const { addComment } = require("../../services/comment.service");
const { getInterviewById } = require("../../services/interview.service");

module.exports = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req.context;
    const { comment } = req.body;
    const interviewId = new mongoose.Types.ObjectId(req.params.interviewId);

    if (!comment || comment.trim() === "") {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid parameters" });
    }

    const interview = await getInterviewById({ interviewId });

    if (!interview) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid interviewId" });
    }

    const commentData = await addComment({
      interviewId: interview._id,
      userId,
      comment,
    });

    return res
      .status(CREATE_STATUS)
      .json({ success: true, comment: commentData });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
