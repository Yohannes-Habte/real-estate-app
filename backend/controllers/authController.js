import User from '../models/userModel.js';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import generateToken from '../middleware/generateToken.js';

//===========================================================
// Register a new user in the database
//===========================================================

export const registerUser = async (req, res, next) => {
  const { username, email, password, image } = req.body;

  if (!username) {
    res.status(404);
    throw new Error('Please fill in all fields');
  }
  if (!email) {
    res.status(404);
    throw new Error('Please fill in all fields');
  }
  if (!password) {
    return next(createError(400, 'Please enter passwor!'));
  }

  try {
    const user = await User.findOne({ email: email });

    // If user already exist exist in the database
    if (user) {
      return next(createError(400, 'Email has already been taken!'));
    }

    // If user does not exist in the database
    if (!user) {
      const newUser = new User({
        username: username,
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
          expires: new Date(Date.now() + 1000 * 60 * 60),
          sameSite: 'none',
          secure: true,
        })
        .status(201)
        .json(savedUser);
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
        createError(404, 'This email does not exist. Please sign up!')
      );
    }

    // If user exist, then check user password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(401, 'Invalid password. Please try again!'));
    }

    // If user exist and password is valid, user will login
    if (user && isPasswordValid) {
      const { password, role, ...otherDetails } = user._doc;

      // Token of the user
      const token = generateToken(user._id);

      // Now, the cookies and the usere data willl be sent to the frontend
      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json(otherDetails);
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
// Register or Log in a user with google
//===========================================================
export const googleLoginRegister = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // If user exist, the user will log in
    if (user) {
      const token = generateToken(user._id);

      const { password, role, ...otherDetails } = user._doc;

      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 3600),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json(otherDetails);
    } else {
      // If user does not exist, the user will sign up
      const generatepassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatepassword, 12);

      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        image: req.body.photo,
      });

      const saveUser = await newUser.save();
      const token = generateToken(saveUser._id);

      const { password, role, ...otherDetails } = saveUser._doc;
      return res
        .cookie('access_token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 3600),
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json(otherDetails);
    }
  } catch (error) {
    console.log(error);
    next(
      createError(400, 'Google log in or sign up failed. Please try again!')
    );
  }
};

//===========================================================
// Log out a user
//===========================================================
export const userLogOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been successfully logged out!');
  } catch (error) {
    next(error);
  }
};
