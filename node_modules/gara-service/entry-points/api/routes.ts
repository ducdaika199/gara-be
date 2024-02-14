import express from 'express';
import { authRoutes } from './auth-routes';
import { pdfRoutes } from './pdf-routes';
import { userRoutes } from './user-routes';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.use('/v1', authRoutes());
  router.use('/v1/pdf', pdfRoutes());
  router.use('/v1/users', userRoutes());
  expressApp.use('/gara', router);
}
