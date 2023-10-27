import express from "express";
import {
  forgetPassword,
  googleLoginRegister,
  loginUser,
  registerUser,
  resetPassword,
  userLogOut,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/google", googleLoginRegister);
authRouter.get("/logout", userLogOut);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/reset-password", resetPassword);



export default authRouter;
