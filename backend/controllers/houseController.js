import House from '../models/houseModel.js';
import createError from 'http-errors';

// =====================================================================
// Create a new house
// =====================================================================

export const createHouse = async (req, res, next) => {
  try {
    const house = await House.create(req.body);
    return res.status(201).json(house);
  } catch (error) {
    next(error);
  }
};

// =====================================================================
// Update created house
// =====================================================================

export const updateHouse = async (req, res, next) => {
  const house = await House.findById(req.params.id);
  if (!house) {
    return next(createError(404, 'House not found!'));
  }

  // if (req.user.id !== house.userRef) {
  //   return next(
  //     createError(403, 'You are only authorized to update your own houses!')
  //   );
  // }
  try {
    const updateHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updateHouse);
  } catch (error) {
    next(error);
  }
};

// =====================================================================
// Get user single house
// =====================================================================

export const getHouse = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return next(createError(404, 'House not found!'));
    }

    res.status(200).json(house);
  } catch (error) {
    next(error);
  }
};

// =====================================================================
// Get all houses
// =====================================================================

export const getAllHouses = async (req, res, next) => {
  try {
    const houses = await House.find();
    if (houses) {
      res.status(200).json(houses);
    } else {
      return next(createError(404, 'Houses not found'));
    }
  } catch (error) {
    next(error);
  }
};
