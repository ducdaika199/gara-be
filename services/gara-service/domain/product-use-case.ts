import {
  createProductDb,
  getAllProductsDb,
  getProductDb,
  updateProductDb,
} from '../data-access/product-repository';

export const getAllProducts = async (req) => {
  const { take, skip } = req.query;
  const products = await getAllProductsDb({ take, skip });
  return products;
};

export const getProduct = async (id) => {
  const product = await getProductDb(id);
  return product;
};

export const createProduct = async (data) => {
  const product = await createProductDb(data);
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await updateProductDb(id, data);
  return product;
};
