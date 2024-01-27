import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as loginUseCase from '../../domain/login-use-case';

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();
  router.post('/login', loginRouterHandle);

  async function loginRouterHandle(req, res, next) {
    logger.info(
      req.params.email,
      '---------------------------email---------------------'
    );
    try {
      logger.info(`Login API was called`);
      const addUserResponse = await loginUseCase.loginByUserNameAndPassword(
        req.body
      );
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  expressApp.use('/gara', router);
}
