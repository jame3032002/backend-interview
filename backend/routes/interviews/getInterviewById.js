const mongoose = require("mongoose");

const { INTERNAL_SERVER_ERROR } = require("../../config/statusMessage");
const { getInterviewById } = require("../../services/interview.service");
const { getCommentsByInterviewId } = require("../../services/comment.service");

module.exports = async (req, res) => {
  try {
    let comments;
    const interviewId = new mongoose.Types.ObjectId(req.params.interviewId);
    const interview = await getInterviewById({
      interviewId: new mongoose.Types.ObjectId(interviewId),
    });

    if (req.query.include === "comments") {
      comments = await getCommentsByInterviewId({ interviewId });
    }

    return res.json({ success: true, interview, comments });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
