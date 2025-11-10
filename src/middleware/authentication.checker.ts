import { NextFunction, Request } from "express";
import { decodeToken } from "../utils/auth.util.ts";


export async function isAuthenticated(
  req: Request,
  res: any,
  next: NextFunction
) {
  try {
    const token =
      req.body.token || req.headers['x-auth-token'] || req.query.token;
    const { user, decodedToken } = await decodeToken({}, token);
    req.ctx = Object.freeze({
      ...decodedToken,
      userId: user.id,
    //   companyId: user.companyId,
      email: user.email,
      name: user.name,
      role: user.role
    } as IContext);

    return next();
  } catch (error:any) {
    return res.status(400).json({
      success: false,
      message: `${
        (error.message || '').includes('expired')
          ? 'Invalid token'
          : error.message
      }`
    });
  }
}