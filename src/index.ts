import express from "express";
import bodyParser from "body-parser";
import { route } from "./app/routes";
import { connect } from "./app/config/db";
import swaggerSpec from "./app/config/swagger";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const secure = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connect();
route(app);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
