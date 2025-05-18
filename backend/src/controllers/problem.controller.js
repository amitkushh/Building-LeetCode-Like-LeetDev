import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollingBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

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

      const submissions = testcases.amp(({ input, output }) => ({
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
        constrains.log("Result", result);

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

export const getAllProblems = async (req, res) => {
  try {
  } catch (error) {}
};

export const getProblemById = async (req, res) => {
  try {
  } catch (error) {}
};

export const updateProblem = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteProblem = async (req, res) => {
  try {
  } catch (error) {}
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
  } catch (error) {}
};
