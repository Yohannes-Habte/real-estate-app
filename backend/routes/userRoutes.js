import express from 'express';
import {
  deleteHouse,
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
userRouter.get('/:id', getUser);
userRouter.delete('/delete/:id', userAuth, deleteUser);
userRouter.get('/', adminAuth, getUsers);
userRouter.get('/user/:id/houses', getUserHouses); // The id represents the user id
userRouter.delete('/houses/delete/:id', deleteHouse); 

export default userRouter;
