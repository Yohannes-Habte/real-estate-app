import Comment from '../models/commentModel.js';
import createError from 'http-errors';

// Create comment
export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    return next(createError(404, 'Comment is not created! Please try again!'));
  }
};

// Get single comment
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      res
        .status(200)
        .json(`${comment.name} comment has been successfully deleted!`);
    } else {
      return next(createComment(404, 'Comment not found! Please try again'));
    }
  } catch (error) {
    return next(
      createError(500, 'Database could not be queried! Please try again!')
    );
  }
};

// Get All comments
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    if (comments) {
      res.status(200).json(comments);
    } else {
      return next(createComment(404, 'Comments not found! Please try again'));
    }
  } catch (error) {
    return next(
      createError(500, 'Database could not be queried! Please try again!')
    );
  }
};

// Count All comments
export const countComments = async (req, res, next) => {
  try {
    const comments = await Comment.countDocuments();
    if (comments) {
      res.status(200).json(` ${comments} have been delivered yet`);
    } else {
      return next(createComment(404, 'Comments not found! Please try again'));
    }
  } catch (error) {
    return next(
      createError(500, 'Database could not be queried! Please try again!')
    );
  }
};

// Delete single comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (comment) {
      res.status(200).json('Comment has been successfully deleted');
    } else {
      return next(createComment(404, 'Comment not found! Please try again'));
    }
  } catch (error) {
    return next(
      createError(500, 'Database could not be queried! Please try again!')
    );
  }
};

// Delete All comments
export const deleteComments = async (req, res, next) => {
  try {
    await Comment.deleteMany();

    res.status(200).json('Comments have been successfully deleted');
  } catch (error) {
    return next(
      createError(500, 'Database could not be queried! Please try again!')
    );
  }
};
