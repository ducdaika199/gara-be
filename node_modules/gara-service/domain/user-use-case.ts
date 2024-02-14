import { getAllUsersDb } from '../data-access/user-repository';

export const getAllUsers = async () => {
  const users = await getAllUsersDb();
  return users;
};

export const createUser = async (userId) => {
  //   const user = await getUserDb(userId);
  //   return user;
};
