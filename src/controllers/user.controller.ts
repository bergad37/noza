import { Request } from 'express';
import { updateUser } from '../services/auth.service.ts';

export async function editUserProfile(req: Request, res: any) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .send({ success: false, message: 'User ID is required' });
    }
    const data = await updateUser({}, req.body, id);

    res.send({ success: true, message: 'User updated successfully', data });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ success: false, message: error?.message });
  }
}

export async function deactivateUserProfile(req: Request, res: any) {
  try {
    const { id } = req.params;

    return await updateUser({}, { isActive: false }, id);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ success: false, message: error?.message });
  }
}

export async function activateUserProfile(req: Request, res: any) {
  try {
    const { userId } = req.params;

    return await updateUser({}, { isActive: true }, userId);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .send({ success: false, message: error?.message });
  }
}
