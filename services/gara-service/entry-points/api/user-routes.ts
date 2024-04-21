import { secure } from '@practica/jwt-token-verifier/lib/secure';
import { logger } from '@practica/logger';
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../domain/user-use-case';

export const userRoutes = () => {
  const router = express.Router();
  router.get('/', secure(), handleSelectUsers);
  router.post('/', secure(), handleCreateUser);
  router.get('/:id', secure(), handleSelectUserById);
  router.put('/:id', secure(), handleUpdateUserById);

  async function handleSelectUsers(req, res, next) {
    logger.info('check call function handle select users');
    try {
      const users = await getAllUsers(req);
      return res.status(200).json(users);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleSelectUserById(req, res, next) {
    try {
      logger.info('check call function handle select user');
      const id = req.params.id;
      const user = await getUser(+id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleCreateUser(req, res, next) {
    try {
      logger.info('Check call function handle create user');
      const data = req.body;
      const user = await createUser(data);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};

async function handleUpdateUserById(req, res, next) {
  try {
    logger.info('Check call function handle update user by id');
    const id = +req.params.id;
    const data = req.body;
    const user = await updateUser(id, data);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return undefined;
  }
}
