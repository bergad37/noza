import  { Request, Response, Router } from 'express';

import { addNewUser, loginController } from '../controllers/auth.controller.ts';

export function AuthRouter(apiRouter: Router) {
  apiRouter.post('/signup', registerNewUser);
  apiRouter.post('/login', loginController);
}

async function registerNewUser(req: Request, res: Response) {
  try {
    const data = await addNewUser(req.body);

    return res.send({
      message: 'User logged in successfully',
      success: true,
      data: data
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message,
      success: false,
      error
    });
  }
}
