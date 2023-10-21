import express from 'express';
import {
  googleLoginRegister,
  loginUser,
  registerUser,
  userLogOut,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/google', googleLoginRegister);
authRouter.get('/logout', userLogOut);

export default authRouter;
