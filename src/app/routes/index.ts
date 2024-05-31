import { Express } from "express";
const HomeRoute = require("./HomeRoute");
const QuizRoute = require("./QuizRoute");

export function route(app: Express) {
  app.use("/quiz", QuizRoute);
  app.use("/", HomeRoute);
}
