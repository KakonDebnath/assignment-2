import express from 'express';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getUserById);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.orderProductToUser);
router.get('/:userId/orders', UserControllers.getAllProducts);
router.get('/:userId/orders/total-price', UserControllers.getTotalPriceOfOrders);

export const UserRoutes = router;
