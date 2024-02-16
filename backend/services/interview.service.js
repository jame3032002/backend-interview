const { STATUS } = require("../config/status");
const Interview = require("../models/interview");

async function getInterviews() {
  const interviews = await Interview.aggregate([
    { $match: { isArchive: false } },
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
        title: 1,
        description: 1,
        status: 1,
        createdBy: 1,
        name: "$user.name",
        isArchive: 1,
        edited: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return interviews;
}

async function addInterview({
  title,
  description,
  status = STATUS[0],
  userId,
}) {
  const interview = await Interview.create({
    title,
    description,
    status,
    createdBy: userId,
  });

  return interview;
}

async function getInterviewById({ interviewId, allArchive = false }) {
  let options = {};

  if (!allArchive) {
    options["isArchive"] = false;
  }

  const interview = await Interview.aggregate([
    { $match: { _id: interviewId, ...options } },
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
        title: 1,
        description: 1,
        status: 1,
        createdBy: 1,
        name: "$user.name",
        isArchive: 1,
        edited: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return interview[0];
}

async function editInterview({ interviewId, data, previousData }) {
  const { title, description, status } = previousData;
  const interview = await Interview.findOneAndUpdate(
    { _id: interviewId, isArchive: false },
    {
      $set: data,
      $push: { edited: { title, description, status, createdAt: Date.now() } },
    },
    { runValidators: true, returnDocument: "after" }
  );

  return interview;
}

async function archiveInterview({ interviewId, isArchive }) {
  const interview = await Interview.findOneAndUpdate(
    { _id: interviewId },
    { $set: { isArchive } },
    { runValidators: true, returnDocument: "after" }
  );

  return interview;
}

async function getInterviewsPaginationBySkipLimit({ page = 1, limit }) {
  const start = (page - 1) * limit;

  const interviews = await Interview.aggregate([
    { $match: { isArchive: false } },
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
        title: 1,
        description: 1,
        status: 1,
        createdBy: 1,
        name: "$user.name",
        isArchive: 1,
        edited: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    {
      $facet: {
        data: [{ $skip: start }, { $limit: limit }],
        info: [
          { $count: "totalResults" },
          {
            $set: {
              isNextPage: {
                $cond: {
                  if: { $gt: ["$totalResults", page * limit] },
                  then: true,
                  else: false,
                },
              },
              currentPage: page,
              limit,
            },
          },
        ],
      },
    },
  ]);

  return interviews;
}

async function getHistoriesByInterviewId({ interviewId }) {
  const histories = await Interview.findOne(
    { _id: interviewId },
    { edited: 1 }
  );
  return histories;
}

module.exports = {
  addInterview,
  getInterviews,
  editInterview,
  getInterviewById,
  archiveInterview,
  getInterviewsPaginationBySkipLimit,
  getHistoriesByInterviewId,
};
