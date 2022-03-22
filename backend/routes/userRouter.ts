import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

/* GET users listing. */
router.post(
  "/signup",
  authController.protect,
  authController.restrictTo("admin", "super"),
  authController.signup
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
