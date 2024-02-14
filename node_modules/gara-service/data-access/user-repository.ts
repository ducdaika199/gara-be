import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsersDb = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserDb = async (userId) => {
  // const user = await prisma.user.
};
