import User from '../models/userModel.js';
import createError from 'http-errors';
import generateToken from '../middleware/generateToken.js';
import bcrypt from 'bcryptjs';

//===========================================================
// Register a new user in the database
//===========================================================

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, image } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // If user does not exist in the database
    if (!user) {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
      });

      // Save the new user in the database
      const savedUser = await newUser.save();

      // User token
      const token = generateToken(savedUser._id);

      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json({
          _id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
          token: token,
        });
    } else {
      // If user already exist exist in the database
      return next(
        createError(
          500,
          'Email has already been taken. Please try another one!'
        )
      );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not sign up. Please try again!'));
  }
};

//===========================================================
// Login a register user in the database
//===========================================================
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // If user does not exist in the database
    if (!user) {
      return next(
        createError(400, 'This email does not exist. Please sign up!')
      );
    }

    // If user exist, then check user password validity
    const isPasswordValid = await bcrypt.compare( password, user.password );

    if (!isPasswordValid) {
      return next(createError(400, 'Invalid password. Please try again!'));
    }

    // If user exist and password is valid, user will login
    if (user ) {
      const { password, role, ...otherDetails } = user._doc;

      // Token of the user
      const token = generateToken(user._id);

      // Now, the cookies and the usere data willl be sent to the frontend
      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, token: token, role });
    } else {
      return next(
        createError(400, 'Invalid email or password! Please check it!')
      );
    }
  } catch (error) {
    console.log(error);
    next(createError(500, 'User could not log in. Please try again!'));
  }
};

//===========================================================
// Get one user from the database
//===========================================================
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(createError(400, 'User could not be accessed. Please try again!'));
  }
};

//===========================================================
// Admin has mandate to get all users from the database
//===========================================================
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(
      createError(400, 'User unable to access all users. Please try again!')
    );
  }
};
