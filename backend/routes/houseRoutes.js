import exress from 'express';
import { createHouse } from '../controllers/houseController.js';
import { adminAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', adminAuth, createHouse);

export default houseRouter;
