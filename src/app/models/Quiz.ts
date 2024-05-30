import { Schema, model } from "mongoose";
import mongoose from "mongoose";

interface Question {
  questionText: string;
  options: string[];
  correctOption: number;
}

export interface IQuiz {
  title: string;
  questions: Question[];
}

const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
});

const QuizSchema = new Schema({
  title: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
});

const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);

export default Quiz;
