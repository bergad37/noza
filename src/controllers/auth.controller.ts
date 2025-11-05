import { Request } from 'express';
import { createUser, readUserByEmail } from '../services/auth.service.ts';
import {
  comparePassword,
  generateJWT,
  generateTempPassword,
  hashPassword
} from '../utils/auth.util.ts';

export async function registerUser(req: Request, res: any) {
  try {
    const { email } = req.body;
    const existingUser = await readUserByEmail({}, email);

    if (existingUser) {
      throw new Error('Account with this email already exist');
    }

    const temporaryPassword = generateTempPassword();
    const data = await createUser(
      {},
      {
        ...req.body,
        email,
        isActive: true,
        password: await hashPassword(temporaryPassword)
      }
    );

    res.send({ success: true, message: 'New user created successfully', data });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ success: false, message: error?.message });
  }
}

export async function loginController(req: Request, res: any) {
  try {
    const { email, password } = req.body;
    const existingUser = await readUserByEmail({}, email);
    if (!existingUser) {
      throw new Error(
        'This email is not registered. Please sign up to create an account.'
      );
    }

    const isPasswordMatch = await comparePassword(
      password,
      existingUser.password!
    );

    if (isPasswordMatch) {
      const token = generateJWT({
        userId: existingUser.id!,
        email: existingUser.email,
        name: existingUser.name
      });
      res.status(200).send({ success: true, data: token });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
}
