import { Router } from 'express';
import {
    activateUserProfile,
  deactivateUserProfile,
  editUserProfile
} from '../controllers/user.controller.ts';
import { isAuthenticated } from '../middleware/authentication.checker.ts';

const router = Router();

router.patch('/:id', isAuthenticated, editUserProfile);
router.patch('/:deactivate/:id', isAuthenticated, deactivateUserProfile);
router.patch('/:activate/:userId', isAuthenticated, activateUserProfile);

export default router;
