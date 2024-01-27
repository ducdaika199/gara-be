import express from 'express';
import { authRoutes } from './auth-routes';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.post('/login', authRoutes());

  expressApp.use('/gara', router);
}
