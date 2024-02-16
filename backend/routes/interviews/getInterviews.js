const {
  getInterviewsPaginationBySkipLimit,
} = require("../../services/interview.service");
const { INTERNAL_SERVER_ERROR } = require("../../config/statusMessage");

module.exports = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const [{ data, info }] = await getInterviewsPaginationBySkipLimit({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    return res.json({ success: true, interviews: data, info: info[0] });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
