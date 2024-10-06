import express, { Router } from 'express';
import { read } from '@renter/controller/signin-controller';
import { create } from '@renter/controller/signup-controller';
const router: Router = express.Router();

export function authRoutes(): Router {
  router.post('/signup', create);
  router.post('/signin', read);

  return router;
}
