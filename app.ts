// const createError = require("http-errors");
import createError from "http-errors";
// const express = require("express");
import express from "express";
// const path = require("path");
import path from "path";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
// const logger = require("morgan");
import logger from "morgan";
// const indexRouter = require("./routes/index");
import indexRouter from "./routes/index";
// const usersRouter = require("./routes/users");
import usersRouter from "./routes/index";
import mongoose from "mongoose";
const app = express();
// const albumRouter = require("./routes/albumRouter");
// const paymentRouter = require("./routes/paymentRouter");
import albumRouter from "./routes/albumRouter";
import paymentRouter from "./routes/paymentRouter";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/albums", albumRouter);
app.use("/payment", paymentRouter);

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
