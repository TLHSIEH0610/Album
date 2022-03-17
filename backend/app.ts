import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import usersRouter from "./routes/userRouter";
import mongoose from "mongoose";
import albumRouter from "./routes/albumRouter";
import paymentRouter from "./routes/paymentRouter";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

//Routes
app.use("/users", usersRouter);
app.use("/albums", albumRouter);
app.use("/payment", paymentRouter);
//not find error
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}, please check again!`, 404));
});
//global error
app.use(globalErrorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log(`App running on port ${3000}...`);
});

mongoose
  .connect("mongodb://localhost:27017/Album")
  .then(() => console.log("connected"));

export default app;
