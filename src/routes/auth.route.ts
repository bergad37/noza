import { Router } from 'express';
import {
  changeUserPassword,
  forgotPasswordResetLink,
  loginController,
  registerUser
} from '../controllers/auth.controller.ts';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginController);
router.patch('/change/password', changeUserPassword);
router.patch('/forgot/password/reset-link', forgotPasswordResetLink);



export default router;
