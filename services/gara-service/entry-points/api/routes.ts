import express from 'express';
import { authRoutes } from './auth-routes';
import { pdfRoutes } from './pdf-routes';
import { userRoutes } from './user-routes';
import { productRoutes } from './product-routes';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.use('/v1', authRoutes());
  router.use('/v1/pdf', pdfRoutes());
  router.use('/v1/users', userRoutes());
  router.use('/v1/products', productRoutes())
  // console log router
  expressApp.use('/gara', router);
}
