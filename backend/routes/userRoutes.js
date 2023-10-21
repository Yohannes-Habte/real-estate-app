import express from 'express';
import {
  deleteUser,
  getUser,
  getUserHouses,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { adminAuth, userAuth } from '../middleware/auth.js';

const userRouter = express.Router();

// User routes
userRouter.put('/update/:id', userAuth, updateUser);
userRouter.get('/:id', userAuth, getUser);
userRouter.delete('/delete/:id', userAuth, deleteUser);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/user/:id/houses', getUserHouses); // The id represents the user id

export default userRouter;
