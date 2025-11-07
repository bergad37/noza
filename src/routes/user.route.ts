import { Router } from 'express';
import {
  deactivateUserProfile,
  editUserProfile
} from '../controllers/user.controller.ts';

const router = Router();

router.patch('/:id', editUserProfile);
router.patch('/:deactivate/:id', deactivateUserProfile);

export default router;
