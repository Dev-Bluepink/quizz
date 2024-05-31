import QuizService from "../service/QuizService";
import { Request, Response } from "express";

class QuizController {
  async getAllQuizzes(req: Request, res: Response) {
    const quizzes = await QuizService.getAll();
    return res.json(quizzes);
  }
  async getQuizById(req: Request, res: Response) {
    const quiz = await QuizService.getById(req.params.id);
    return res.json(quiz);
  }
  async createQuiz(req: Request, res: Response) {
    const quiz = await QuizService.create(req.body);
    return res.json(quiz);
  }
  async getQuestionsByQuizId(req: Request, res: Response) {
    console.log(req.query);
    const numOfQuestions = parseInt(req.query.numOfQuestions as string);
    const quiz = await QuizService.getById(req.params.id);
    const questions = quiz?.questions;
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, numOfQuestions);
    const selectedQuestionIndexes = selectedQuestions.map((question) =>
      questions.indexOf(question)
    );
    return res.json({ selectedQuestions, selectedQuestionIndexes });
  }
  async submitQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { questionIndex, selectedOption } = req.body;
      console.log(req.body);
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
