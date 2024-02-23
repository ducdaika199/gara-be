import {
  createProductDb,
  getAllProductsDb,
  getProductDb,
} from '../data-access/product-repository';

export const getAllProducts = async (req) => {
  const { take, skip } = req.query;
  const products = await getAllProductsDb({ take, skip });
  return products;
};

export const getProduct = async (id) => {
  const user = await getProductDb(id);
  return user;
};

export const createProduct = async (data) => {
  const user = await createProductDb(data);
  return user;
};

export const updateProduct = async (id, data) => {
  const user = await updateProduct(id, data);
  return user;
};
