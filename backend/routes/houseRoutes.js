import exress from 'express';
import {
  createHouse,
  getHouse,
  getSearchedHouses,
  updateHouse,
} from '../controllers/houseController.js';
import { userAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', createHouse);
houseRouter.put('/update/:id', updateHouse);
houseRouter.get('/house/:id', getHouse);
houseRouter.get('/', getSearchedHouses );

export default houseRouter;
