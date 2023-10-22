import exress from 'express';
import { createHouse, getAllHouses } from '../controllers/houseController.js';
import { userAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', createHouse);
houseRouter.get('/', getAllHouses);

export default houseRouter;
