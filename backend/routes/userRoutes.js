import express from 'express';
import {
  getUser,
  getUsers,
  googleLoginRegister,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google', googleLoginRegister);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/:id', userAuth, getUser);
userRouter.put('/update/:id', userAuth, updateUser);

export default userRouter;
