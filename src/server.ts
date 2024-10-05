import http from 'http';

import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '@renter/config';
import compression from 'compression';
import { appRoutes } from '@renter/routes';
import { StatusCodes } from 'http-status-codes';
import { CustomError, IErrorResponse } from '@renter/types/error';

export class RenterServer {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.errorHandler(this.app);
    this.startServer(this.app);
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  }
  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        ...(config.NODE_ENV !== 'development' && {
          sameSite: 'none'
        })
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private errorHandler(app: Application): void {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      console.log('error', `${fullUrl} endpoint does not exist.`, '');
      res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.' });
      next();
    });

    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeErrors());
      }

      next();
    });
  }
  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log('error', 'GatewayService startServer() error method:', error);
    }
  }
  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      console.log(`Gateway server has started with process id ${process.pid}`);
      httpServer.listen(config.PORT, () => {
        console.log(`Gateway server running on port ${config.PORT}`);
      });
    } catch (error) {
      console.log('error', 'GatewayService startServer() error method:', error);
    }
  }
}
