import exress from 'express';
import {
  createHouse,
  getAllHouses,
  getHouse,
  updateHouse,
} from '../controllers/houseController.js';
import { userAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', createHouse);
houseRouter.put('/update/:id', updateHouse);
houseRouter.get('/house/:id', getHouse);
houseRouter.get('/', getAllHouses);

export default houseRouter;
