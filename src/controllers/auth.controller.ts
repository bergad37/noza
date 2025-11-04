import { Request } from 'express';
import { createUser, readUserByEmail } from '../services/auth.service.ts';

export async function registerUser(req: Request, res: any) {
  try {
    const { email } = req.body;

    const existingUser = await readUserByEmail({}, email);

    if (existingUser) {
      throw new Error('Account with this email already exist');
    }

    const data = await createUser(
      {},
      {
        ...req.body,
        email
      }
    );

    res.send({ message: 'New user created', success: true, data });
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function loginController() {}
