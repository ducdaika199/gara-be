import { PrismaClient, User } from '@prisma/client';
import { username } from './config/config';

const prisma = new PrismaClient();

export const getAllUsersDb = async ({ take, skip }) => {
  let query = {
    take: 5,
    skip: 0,
  };
  if (take && skip) {
    query = {
      take: +take,
      skip: +skip,
    };
  }
  const users = await prisma.$transaction([
    prisma.user.findMany({
      ...query,
      where: {
        status: 'ACTIVE',
      },
    }),
    prisma.user.count(),
  ]);
  return {
    data: users[0],
    total: users[1],
    pagination: {
      take,
      skip,
    },
  };
};

export const getUserDb = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const createUserDb = async (data: User) => {
  const user = await prisma.user.create({
    data: data,
  });
  return user;
};

export const updateUserDb = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  return user;
};

export const getUserByUserNameDb = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};
