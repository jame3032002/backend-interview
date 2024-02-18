const mongoose = require("mongoose");

const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_STATUS,
} = require("../../config/statusMessage");
const {
  getInterviewById,
  archiveInterview,
} = require("../../services/interview.service");

module.exports = async (req, res) => {
  try {
    const { isArchive } = req.body;
    const interviewId = new mongoose.Types.ObjectId(req.params.interviewId);

    if (isArchive === undefined || typeof isArchive !== "boolean") {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid parameters" });
    }

    const interviewData = await getInterviewById({
      interviewId,
      allArchive: true,
    });

    if (!interviewData) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid interviewId" });
    }

    const interview = await archiveInterview({ interviewId, isArchive });
    return res.json({
      success: true,
      interview: {
        ...interview._doc,
        name: interviewData.name,
        email: interviewData.email,
      },
    });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
