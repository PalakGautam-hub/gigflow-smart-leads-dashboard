import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../validators/auth.validator';

const router = Router();

router.post(
  '/register',
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  '/login',
  validate(loginSchema),
  authController.login.bind(authController)
);

router.get(
  '/profile',
  authenticate,
  authController.getProfile.bind(authController)
);

export default router;
