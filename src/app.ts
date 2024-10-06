import express, { Express } from 'express';
import { RenterServer } from '@renter/server';
import { databaseConnection } from '@renter/database';
import { config } from '@renter/config';

class Application {
  public initializeApp(): void {
    const app: Express = express();
    databaseConnection();
    config.cloudinaryConfig();
    const server = new RenterServer(app);
    server.start();
  }
}

export const app = new Application();
app.initializeApp();
