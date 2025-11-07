import { Router } from 'express';
import {
  changeUserPassword,
  loginController,
  registerUser
} from '../controllers/auth.controller.ts';

const router = Router();

router.post('/register', registerUser);
router.post('/login',loginController);
router.patch('/change/password', changeUserPassword);


export default router;
