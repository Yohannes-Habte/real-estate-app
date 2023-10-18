import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  googleLoginRegister,
  loginUser,
  registerUser,
  updateUser,
  userLogOut,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google', googleLoginRegister);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/:id', userAuth, getUser);
userRouter.delete('/user/logout', userLogOut);
userRouter.put('/update/:id', userAuth, updateUser);
userRouter.delete('/delete/:id', userAuth, deleteUser);


export default userRouter;
