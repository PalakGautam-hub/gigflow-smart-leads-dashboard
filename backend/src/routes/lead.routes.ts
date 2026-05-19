import { Router } from 'express';
import { leadController } from '../controllers/lead.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
  createLeadSchema,
  updateLeadSchema,
  leadQuerySchema,
} from '../validators/lead.validator';
import { UserRole } from '../types';

const router = Router();

// All lead routes require authentication
router.use(authenticate);

// Stats & recent — must be before /:id
router.get(
  '/stats',
  leadController.getStats.bind(leadController)
);

router.get(
  '/recent',
  leadController.getRecentLeads.bind(leadController)
);

// CRUD
router.get(
  '/',
  validate(leadQuerySchema),
  leadController.getLeads.bind(leadController)
);

router.get(
  '/:id',
  leadController.getLeadById.bind(leadController)
);

router.post(
  '/',
  authorize(UserRole.ADMIN),
  validate(createLeadSchema),
  leadController.createLead.bind(leadController)
);

router.put(
  '/:id',
  authorize(UserRole.ADMIN, UserRole.SALES),
  validate(updateLeadSchema),
  leadController.updateLead.bind(leadController)
);

router.delete(
  '/:id',
  authorize(UserRole.ADMIN),
  leadController.deleteLead.bind(leadController)
);

export default router;
