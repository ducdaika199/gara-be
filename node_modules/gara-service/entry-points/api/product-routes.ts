import { logger } from '@practica/logger';
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../domain/user-use-case';
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../../domain/product-use-case';

export const productRoutes = () => {
  const router = express.Router();
  router.get('/', handleSelectProducts);
  router.post('/', handleCreateProduct);
  router.get('/:id', handleSelectProductById);
  router.put('/:id', handleUpdateProductById);

  async function handleSelectProducts(req, res, next) {
    try {
      logger.info('Function handle select all product was call');
      const products = await getAllProducts(req);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleSelectProductById(req, res, next) {
    try {
      logger.info('check call function handle select product');
      const id = req.params.id;
      const product = await getProduct(+id);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleCreateProduct(req, res, next) {
    try {
      logger.info('Check call function handle create product');
      const data = req.body;
      const product = await createProduct(data);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};

async function handleUpdateProductById(req, res, next) {
  try {
    logger.info('Check call function handle update product by id');
    const id = +req.params.id;
    const data = req.body;
    const product = await updateProduct(id, data);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
    return undefined;
  }
}
