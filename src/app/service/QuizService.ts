import Quiz, { IQuiz } from "../models/Quiz";

export class QuizService {
  public async getAll() {
    return Quiz.find({});
  }

  public async getById(id: string) {
    return Quiz.findById(id);
  }

  public async create(quiz: IQuiz) {
    return Quiz.create(quiz);
  }
}
