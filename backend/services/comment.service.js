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
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        interviewId: 1,
        comment: 1,
        createdAt: 1,
        createdBy: 1,
        name: "$user.name",
        email: "$user.email",
      },
    },
    {
      $sort: {
        createdAt: -1,
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

async function deleteCommentById({ commentId }) {
  await Comment.deleteOne({ _id: commentId });
}

async function getCommentById({ commentId }) {
  const comment = await Comment.findOne({ _id: commentId });

  return comment;
}

async function updateCommentById({ commentId, comment }) {
  const latestComment = await Comment.findOneAndUpdate(
    { _id: commentId },
    { $set: { comment } },
    { returnDocument: "after" }
  );

  return latestComment;
}

module.exports = {
  addComment,
  getCommentById,
  deleteCommentById,
  updateCommentById,
  getCommentsByInterviewId,
};
