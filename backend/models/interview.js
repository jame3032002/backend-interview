const mongoose = require("mongoose");

const { STATUS } = require("../config/status");

const Schema = mongoose.Schema;
const InterviewSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: STATUS,
      require: true,
      default: STATUS[0],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    isArchive: {
      type: Boolean,
      default: false,
    },
    edited: {
      type: [
        {
          title: {
            type: String,
            require: true,
          },
          description: {
            type: String,
            require: true,
          },
          status: {
            type: String,
            enum: STATUS,
            require: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", InterviewSchema);

module.exports = Interview;
