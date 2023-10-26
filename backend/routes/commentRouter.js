import express from 'express';
import {
    countComments,
  createComment,
  deleteComment,
  deleteComments,
  getComment,
  getComments,
} from '../controllers/commentController.js';

// Comment router
const commentRouter = express.Router();

// comment routes
commentRouter.post('/new-comment', createComment);
commentRouter.get('/:id', getComment);
commentRouter.get('/', getComments);
commentRouter.get('/count/all', countComments);
commentRouter.delete('/:id', deleteComment);
commentRouter.delete('/', deleteComments);

// export comment router
export default commentRouter;
