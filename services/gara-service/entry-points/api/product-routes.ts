import { logger } from '@practica/logger';
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../domain/user-use-case';
import { getAllProducts } from '../../domain/product-use-case';

export const productRoutes = () => {
  const router = express.Router();
  router.get('/', handleSelectProducts);
  router.post('/', handleCreateUser);
  router.get('/:id', handleSelectUserById);
  router.put('/:id', handleUpdateUserById);

  async function handleSelectProducts(req, res, next) {
    try {
      logger.info('Function handle select all product was call');
      const products = await getAllProducts();
      return res.status(200).json(products);
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
    const id = req.params.id;
    const data = req.body;
    const user = await updateUser(id, data);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
    return undefined;
  }
}
