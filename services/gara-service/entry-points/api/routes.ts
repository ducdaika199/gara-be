import express from 'express';
import { authRoutes } from './auth-routes';
import { pdfRoutes } from './pdf-routes';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.use('/v1', authRoutes());
  router.use('/v1/pdf', pdfRoutes());
  expressApp.use('/gara', router);
}
