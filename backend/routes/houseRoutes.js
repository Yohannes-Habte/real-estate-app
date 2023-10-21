import exress from 'express';
import { createHouse,  } from '../controllers/houseController.js';
import { userAuth } from '../middleware/auth.js';

const houseRouter = exress.Router();

// Houre routes
houseRouter.post('/create', createHouse );
houseRouter.put('/update/:id', createHouse );
houseRouter.delete('/delete/:id', createHouse );


export default houseRouter;
