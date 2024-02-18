const mongoose = require("mongoose");

const {
  editInterview,
  getInterviewById,
} = require("../../services/interview.service");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_STATUS,
} = require("../../config/statusMessage");
const { STATUS } = require("../../config/status");

module.exports = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const interviewId = new mongoose.Types.ObjectId(req.params.interviewId);

    if (!title && !description && !status) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid parameters" });
    }

    const interviewData = await getInterviewById({ interviewId });
    if (!interviewData) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid interviewId" });
    }

    const dataToUpdate = {
      title: title || interviewData.title,
      description: description || interviewData.description,
      status: status || interviewData.status,
    };

    if (!STATUS.includes(dataToUpdate.status)) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid status" });
    }

    const previousData = {
      title: interviewData.title,
      description: interviewData.description,
      status: interviewData.status,
    };

    const interview = await editInterview({
      interviewId,
      data: dataToUpdate,
      previousData,
    });

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
