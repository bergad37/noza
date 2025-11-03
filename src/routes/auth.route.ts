import express, { Router } from 'express';
import {
  loginController,
  registerUserController
} from '../controllers/auth.controller.ts';

export function AuthRouter(apiRouter: Router) {
  apiRouter.post('/signup', registerUserController);
  apiRouter.post('/login', loginController);
}
