import express, { Router } from 'express';
import {
  loginController,
  registerUserController
} from '../controllers/authController.ts';

export function AuthRouter(apiRouter: Router) {
  apiRouter.post('/signup', registerUserController);
  apiRouter.post('/login', loginController);
}
