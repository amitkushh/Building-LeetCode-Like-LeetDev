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

export const getSubmissionsForProblem = async (req, res) => {};

export const getAllTheSubmissionsForProblem = async (req, res) => {};
