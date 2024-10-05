import { Application } from 'express';
import { emailRoutes } from '@renter/routes/email-route';

const BASE_PATH = '/api/';

export const appRoutes = (app: Application) => {
  app.use(BASE_PATH, emailRoutes());
};
