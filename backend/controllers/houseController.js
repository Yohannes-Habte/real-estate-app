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

// ========================================================================================================
// Get houses based on search using limit, start index, which page are you in, offer, parking and others
// ========================================================================================================

export const getSearchedHouses = async (req, res, next) => {
  try {
    // Limit
    const limit = parseInt(req.query.limit) || 9;

    // Apply index
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Offer
    let offer = req.query.offer;

    // offer by default is undefined and false. Therefore, you need to search inside the database both true and false.
    // It means that if offer is unchecked at the beginning, the user will see both offered and not offered houses
    // When the user checked offered houses, the user will see only the offered houses
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    // Furnish procedure is the same as offer
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    // Parking procedure is the same as offer
    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    // type procedure is the same as offer except "all", which represents that sale and rent are checked by default
    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    // Search Item represent what you write on the search bar
    const searchItem = req.query.searchItem || '';

    // sorting the searchTerm
    const sort = req.query.sort || 'createdAt';

    // Order the searchItem in descending manner
    const order = req.query.order || 'desc';

    // Now you can apply all the above variables
    // $regex is used to search a single word or part of a word in a paragraphes or sentences
    // $options: 'i' considers both lowerCase and upperCase
    // skip is used to skil the starting index
    const listings = await House.find({
      name: { $regex: searchItem, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
