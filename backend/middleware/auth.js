import User from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import createError from 'http-errors';

// Auth user
export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    // If not token exist ...
    if (!token) {
      return next(createError(401, 'User is not authenticated!'));
    }

    // If the token exist, decode it
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    // Find user id
    const user = await User.findById(decodedToken.id);

    if ((user && user.id === req.params.id) || user.role === 'admin') {
      req.user = user;
      next();
    } else {
      return next(createError(403, 'You can update only your own account!'));
    }
  } catch (error) {
    next(err);
  }
};

// Auth Admin
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, 'User is not authenticated!'));
    }

    // If the token exist, decode it
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

    // Find user id
    const user = await User.findById(decodedToken.id);

    if (user && user.id === req.params.id && user.role === 'admin') {
      req.user = user;
      next();
    } else {
      return next(createError(403, 'Unauthorized user!'));
    }
  } catch (error) {
    next(err);
  }
};
