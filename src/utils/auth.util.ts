import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import _ from 'lodash';
import { readUserByEmail } from '../services/auth.service.ts';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const JWT_SECRET: string = process.env.JWT_SECRET!;
const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION || '1h';

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function generateJWT(payload: Record<string, unknown>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION as any });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}

export function generateTempPassword(length = 12): string {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

export async function decodeToken(ctx: IContext, token: string) {
  if (_.isNil(token)) throw new Error(`Invalid token or token has expired`);

  const decodedToken: any = jwt.decode(token, { complete: true });

  const user = await readUserByEmail(ctx, decodedToken.email);
  if (_.isEmpty(user)) {
    throw new Error(`Invalid token`);
  }
  return { user, decodedToken };
} 

