const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    interviewId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
