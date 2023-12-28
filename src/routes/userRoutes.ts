import express, { Router } from 'express';
import UserController from '../controller/userController'
import { isAuthenticatedUser } from '../middleware/auth';
import { paginationMiddleware } from '../middleware/page';
import { searchMiddleware } from '../middleware/search';
const router: Router = express.Router();
const Controller = new UserController()

router.post('/singupsignin', Controller.signUpSignIn);

router.post('/verifyotp', Controller.verifyOtp)

router.get('/getallusers', paginationMiddleware, searchMiddleware, isAuthenticatedUser, Controller.getAllUser)

router.get('/getuser/:id', isAuthenticatedUser, Controller.getUser)

router.put('/:id', isAuthenticatedUser, Controller.updateUser)

router.delete('/:id', isAuthenticatedUser, Controller.deleteUser)

export default router;