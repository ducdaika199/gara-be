import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProductsDb = async ({ take, skip }) => {
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
  const products = await prisma.$transaction([
    prisma.product.findMany({
      ...query,
    }),
    prisma.product.count(),
  ]);
  return {
    data: products[0],
    total: products[1],
    pagination: {
      take,
      skip,
    },
  };
};

export const getProductDb = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

export const createProductDb = async (data: Product) => {
  const product = await prisma.product.create({
    data: data,
  });
  return product;
};

export const updateProductDb = async (id, data) => {
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: data,
  });
  return product;
};
