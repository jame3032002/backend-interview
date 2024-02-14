const { STATUS } = require("../../config/status");
const {
  CREATE_STATUS,
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR,
} = require("../../config/statusMessage");
const { addInterview } = require("../../services/interview.service");

module.exports = async (req, res) => {
  try {
    const {
      user: { userId, name },
    } = req.context;
    const { title, description, status = STATUS[0] } = req.body;

    if (!title || !description) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid title or description" });
    }

    if (!STATUS.includes(status)) {
      return res
        .status(BAD_REQUEST_STATUS)
        .json({ error: true, message: "Invalid status" });
    }

    const interview = await addInterview({
      title,
      description,
      status,
      userId,
    });

    return res
      .status(CREATE_STATUS)
      .json({ success: true, interview: { ...interview._doc, name } });
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: true, message: "Internal server error" });
  }
};
