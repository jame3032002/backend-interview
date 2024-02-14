const { getInterviews } = require("../../services/interview.service");
const { INTERNAL_SERVER_ERROR } = require("../../config/statusMessage");

module.exports = async (_, res) => {
  try {
    const interviews = await getInterviews();
    return res.json({ success: true, interviews });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
