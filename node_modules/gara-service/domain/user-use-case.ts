import {
  createUserDb,
  getAllUsersDb,
  getUserDb,
  updateUserDb,
} from '../data-access/user-repository';

export const getAllUsers = async (req) => {
  const { take, skip } = req.query;
  const users = await getAllUsersDb({ take, skip });
  return users;
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
