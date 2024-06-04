import { Express } from "express";
const HomeRoute = require("./HomeRoute");
const QuizRoute = require("./QuizRoute");
const GeminiRoute = require("./GeminiRoute");

export function route(app: Express) {
  app.use("/gemini", GeminiRoute);
  app.use("/quiz", QuizRoute);
  app.use("/", HomeRoute);
}
