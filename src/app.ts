import express, { Express } from 'express';

import { RenterServer } from './server';

class Application {
  public initializeApp(): void {
    const app: Express = express();
    const server = new RenterServer(app);
    server.start();
  }
}

export const app = new Application();
app.initializeApp();
