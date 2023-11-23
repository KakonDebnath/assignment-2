import express from 'express';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getUserById);

export const UserRoutes = router;
