import House from '../models/houseModel.js';
import User from '../models/userModel.js';
import createError from 'http-errors';

//===========================================================
// Update user data or infos
//===========================================================
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (user) {
      const updatedUserData = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            image: req.body.image || user.image,
          },
        },
        { new: true, runValidators: true }
      );

      const { password, role, ...otherDetails } = updatedUserData._doc;
      return res.status(200).json(otherDetails);
    } else {
      return next(createError(400, 'User not found'));
    }
  } catch (error) {
    console.log(error);
    next(createError(400, 'User data is not updated. Please try again!'));
  }
};

//===========================================================
// Get one user from the database
//===========================================================
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User does not exist! Please try again!'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
    console.log(error);
    next(createError(500, 'Database could not be accessed. Please try again!'));
  }
};

//===========================================================
// Delete a user from the database
//===========================================================
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (user) {
      await User.findByIdAndDelete(userId);
      res.clearCookie('access_token');
      res.status(200).json(`User has been successfully deleted!`);
    } else {
      return next(createError(400, 'User does not exist! Please try again!'));
    }
  } catch (error) {
    console.log(error);
    next(createError(400, 'User is not deleteted. Please try again!'));
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

// =============================================================================
// Get all houses created by a particular user or belong for a particular user
// =============================================================================

export const getUserHouses = async (req, res, next) => {
  try {
    const houses = await House.find({ userRef: req.params.id });
    if (houses) {
      res.status(200).json(houses);
    } else {
      return next(createError(400, 'No houses found! Please try again!'));
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(
        'The houses that you created could not be accessed. Please try again!'
      )
    );
  }
};

// =====================================================================
// Delet Your house
// =====================================================================

export const deleteHouse = async (req, res, next) => {
  const house = await House.findById(req.params.id);
  if (!house) {
    return next(createError(404, 'House not found!'));
  }

  // if (req.user._id !== house.userRef) {
  //   return next(
  //     createError(403, 'You are only authorized to delete your own houses!')
  //   );
  // }

  try {
    await House.findByIdAndDelete(req.params.id);
    res.status(200).json(`${house.name} has been successfully deleted!`);
  } catch (error) {
    next(error);
  }
};
