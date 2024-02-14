import { getAllUsersDb } from '../data-access/user-repository';

export const getAllUsers = async () => {
  const users = await getAllUsersDb();
  return users;
};

export const createUser = async (req) => {
  const user = req.body.data;
  const data = await (user);
  return data;
};
