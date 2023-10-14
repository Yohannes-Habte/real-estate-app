import express from 'express';
import {
  getUser,
  getUsers,
  googleLoginRegister,
  loginUser,
  registerUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google', googleLoginRegister);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

export default userRouter;
