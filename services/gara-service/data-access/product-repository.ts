import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProductsDb = async () => {
  const products = await prisma.product.findMany();
  return products;
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
