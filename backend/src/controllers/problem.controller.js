import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollingBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

//Creating Problems Logic

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constrains,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to create a problem",
      success: false,
    });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollingBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcases ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    //Problem saved to database
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constrains,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while creating problem",
    });
  }
};

//Fetching all Problems Logic

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
    });

    if (!problems) {
      return res.status(404).json({
        message: "No Problem Found",
      });
    }

    res.status(200).json({
      message: "Problems Fetch Successfully",
      success: true,
      problems,
    });
  } catch (error) {
    console.error("error while fetching problems", error);
    res.status(500).json({
      message: "Error while Fetching Problems",
    });
  }
};

//Fetching Problem By Id Logic

export const getProblemById = async (req, res) => {
  try {
  } catch (error) {}
};

//Updating Problem Logic

export const updateProblem = async (req, res) => {
  try {
  } catch (error) {}
};

//Delete Problem Logic

export const deleteProblem = async (req, res) => {
  try {
  } catch (error) {}
};

//Fetching all Problems Solved By the User Logic

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
  } catch (error) {}
};
