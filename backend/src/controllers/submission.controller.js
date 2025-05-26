import { db } from "../libs/judge0.lib.js";

export const getAllSubmission = async (req, res) => {
  try {
    const userId = req.user.userId;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      message: "submission",
      success: true,
      submissions,
    });
  } catch (error) {
    console.error({
      message: "Fetch Submissions Error",
      error,
    });

    res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = req.params.problemId;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res.status(200).json({
      message: "Submission fetched successfully",
      success: true,
      submissions,
    });
  } catch (error) {
    console.error({
      message: "Fetch Submissions Error",
      error,
    });

    res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const submission = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).josn({
      message: "Submissions Fetched successfully",
      success: true,
      submission,
    });
  } catch (error) {
    console.error({ message: "Fetch Submissions Error", error });
    res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
};
