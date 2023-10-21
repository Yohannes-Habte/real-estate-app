import exress from 'express';
import { createHouse } from '../controllers/houseController.js';
import { userAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', createHouse );

export default houseRouter;
