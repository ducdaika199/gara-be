import util from 'util';
import express from 'express';
import { logger } from '@practica/logger';
import * as loginUseCase from '../../domain/login-use-case'

export default function defineRoutes(expressApp: express.Application) {
  logger.info('check call function')
  const router = express.Router();
  router.post('/login', loginRouterHandle);

  async function loginRouterHandle(req, res, next) {
    try {
      logger.info(`Login API was called`);
      const addUserResponse = await loginUseCase.loginByUserNameAndPassword(req.body);
      return res.json(addUserResponse);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  expressApp.use('/gara', router);
}
