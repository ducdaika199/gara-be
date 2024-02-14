import { logger } from '@practica/logger';
import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import * as pdfUseCase from '../../domain/pdf-use-case';
import { getAllUsers } from '../../domain/user-use-case';

export const userRoutes = () => {
  const router = express.Router();
  router.get('/', handleSelectUsers);
  router.post('/:id', handleCreateUsers);

  async function handleSelectUsers(req, res, next) {
    try {
      logger.info('check call function handle pdf invoice');
      const users = await getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleCreateUsers(req, res, next) {
    try {
      logger.info('Check call function handle create user');
      //   const user = await createUser();
      //   return res.status(200).json(user);
      return true;
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};
