const Comment = require("../models/comment");

async function getCommentsByInterviewId({ interviewId }) {
  const comments = await Comment.aggregate([
    { $match: { interviewId } },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);

  return comments;
}

async function addComment({ interviewId, userId, comment }) {
  const c = await Comment.create({
    interviewId,
    createdBy: userId,
    comment,
  });

  return c;
}

module.exports = {
  addComment,
  getCommentsByInterviewId,
};
