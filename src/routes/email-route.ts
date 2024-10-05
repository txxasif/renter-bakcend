import { sendEmailController } from '@renter/controller/email-controller';
import express, { Router } from 'express';
const router: Router = express.Router();
const BASE_PATH = '/email';
const emailRoutes = (): Router => {
  router.get(BASE_PATH, sendEmailController);

  return router;
};

export { emailRoutes };
