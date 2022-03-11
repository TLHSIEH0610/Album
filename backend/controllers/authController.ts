import { catchAsync } from "../utils/catchAsync";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { promisify } from "util";

const signToken = (id) =>
  jwt.sign(
    {
      //anything can be store in the token
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  //send token into cookies
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  if (process.env.NODE_ENV === "development") cookieOptions.secure = false;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);

  //return a string token
  // const token = signToken(newUser._id);

  // res.status(201).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //check required input are sent
  if (!email || !password) {
    return next(new AppError("Email or Password missing", 400));
  }
  //find user and check password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError(`Email or Password incorrected!`, 401));
  }

  //send token to user

  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    // data: {
    //   user: user,
    // }
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  }

  if (!token) {
    return next(new AppError(`unAuth, please log in`, 401));
  }

  //get user info from token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exist
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError(`user not exist`, 401));
  }

  //allow access
  req.user = user;
  next();
});

//function to receive argument in order to pass into the middleware
export const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError(`Premission refused!`, 403));
    }

    next();
  };
};
