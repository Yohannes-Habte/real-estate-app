import House from '../models/houseModel.js';

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
