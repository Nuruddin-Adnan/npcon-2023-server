import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { RegistrationController } from './registration.controller';

const router = express.Router();

router.post(
  '/create-registration',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  RegistrationController.createRegistration,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
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
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.RENT_COLLECTOR),
  RegistrationController.getAllRegistrations,
);

export const RegistrationRoutes = router;
