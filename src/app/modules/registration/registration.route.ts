import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { RegistrationController } from './registration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RegistrationValidation } from './registration.validation';

const router = express.Router();

router.post(
  '/create-registration',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  validateRequest(RegistrationValidation.createRegistrationZodSchema),
  RegistrationController.createRegistration,
);

router.get(
  '/my-registrations',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  RegistrationController.myRegistrations,
);

// show the registrations to all
// This is only important field with approved item
router.get(
  '/show-to-all',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.RENT_COLLECTOR,
    ENUM_USER_ROLE.GENERAL_USER,
  ),
  RegistrationController.showToAllRegistrations,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  validateRequest(RegistrationValidation.updateRegistrationZodSchema),
  RegistrationController.updateRegistration,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  RegistrationController.deleteRegistration,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  RegistrationController.getSingleRegistration,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  RegistrationController.getAllRegistrations,
);

export const RegistrationRoutes = router;
