const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_STATUS,
} = require("../../config/statusMessage");
const {
  getHistoriesByInterviewId,
} = require("../../services/interview.service");

module.exports = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const histories = await getHistoriesByInterviewId({ interviewId });
    if (!histories) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid interviewId" });
    }
    const { edited } = histories;

    return res.json({ success: true, histories: edited });
  } catch (error) {
    console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
