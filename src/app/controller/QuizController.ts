import QuizService from "../service/QuizService";
import { Request, Response } from "express";
import CustomError from "../utils/CustomError";

class QuizController {
  async getAllQuizzes(req: Request, res: Response) {
    try {
      const quizzes = await QuizService.getAll();
      return res.json(quizzes);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
  async getQuizById(req: Request, res: Response) {
    try {
      const quiz = await QuizService.getById(req.params.id);
      if (!quiz) {
        throw new CustomError(204, "Quiz not found");
      }
      return res.json(quiz);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
  async createQuiz(req: Request, res: Response) {
    try {
      const quiz = await QuizService.create(req.body);
      return res.json(quiz);
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
  async getQuestionsByQuizId(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        throw new CustomError(400, "Invalid ID");
      }
      const numOfQuestions = parseInt(req.query.numOfQuestions as string);
      const quiz = await QuizService.getById(req.params.id);
      const questions = quiz?.questions;
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "No questions found" });
      }
      const shuffledQuestions = questions
        .map((question) => ({ question, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ question }) => question);
      const selectedQuestions = shuffledQuestions.slice(0, numOfQuestions);
      const selectedQuestionIndexes = selectedQuestions.map((question) =>
        quiz.questions.findIndex(
          (q) => q.questionText === question.questionText
        )
      );
      return res.json({ selectedQuestions, selectedQuestionIndexes });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
  async submitQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { questionIndex, selectedOption } = req.body;
      if (!Array.isArray(questionIndex) || !Array.isArray(selectedOption)) {
        return res.status(400).json({ message: "Invalid input format" });
      }

      const countQuestion = questionIndex.length;
      if (countQuestion !== selectedOption.length) {
        return res.status(400).json({ message: "Mismatched input lengths" });
      }

      const maxScore = countQuestion * 10;
      let score = 0;
      const quiz = await QuizService.getById(id);

      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      questionIndex.forEach((index: number, idx: number) => {
        const question = quiz.questions[index];
        if (question && question.correctOption === selectedOption[idx]) {
          score += 10;
        }
      });

      return res.json({ score, maxScore });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}

export default new QuizController();
