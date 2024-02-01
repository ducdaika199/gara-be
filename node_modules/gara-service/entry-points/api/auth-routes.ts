import { logger } from '@practica/logger';
import express from 'express';
import * as loginUseCase from '../../domain/login-use-case';

export const authRoutes = () => {
  const router = express.Router();
  router.post('/login', loginRouterHandle);

  async function loginRouterHandle(req, res, next) {
    try {
      logger.info(`Login API was called`);
      logger.info(req.body.email);
      const addUserResponse = await loginUseCase.loginByUserNameAndPassword(
        req.body
      );
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  return router;
};
