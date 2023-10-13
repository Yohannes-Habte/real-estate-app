import express from 'express';
import {
  getUser,
  getUsers,
  loginUser,
  registerUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

export default userRouter;
