import { Application } from 'express';
import { emailRoutes } from '@renter/routes/email-route';
import { authRoutes } from '@renter/routes/auth';

const BASE_PATH = '/api/';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, emailRoutes());
  app.use(BASE_PATH, authRoutes());
};
