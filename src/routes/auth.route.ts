import { Router } from 'express';
import {
  changeUserPassword,
  forgotPasswordResetLink,
  loginController,
  registerUser
} from '../controllers/auth.controller.ts';
import { isAuthenticated } from '../middleware/authentication.checker.ts';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginController);
router.patch('/change/password', isAuthenticated, changeUserPassword);
router.patch('/forgot/password/reset-link', forgotPasswordResetLink);



export default router;
