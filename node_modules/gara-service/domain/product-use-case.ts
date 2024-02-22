import { getAllProductsDb } from '../data-access/product-repository';
import {
  createUserDb,
  getAllUsersDb,
  getUserDb,
  updateUserDb,
} from '../data-access/user-repository';

export const getAllProducts = async () => {
  const products = await getAllProductsDb();
  return products;
};

export const getUser = async (id) => {
  const user = await getUserDb(id);
  return user;
};

export const createUser = async (data) => {
  const user = await createUserDb(data);
  return user;
};

export const updateUser = async (id, data) => {
  const user = await updateUserDb(id, data);
  return user;
};
