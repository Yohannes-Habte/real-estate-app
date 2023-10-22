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

