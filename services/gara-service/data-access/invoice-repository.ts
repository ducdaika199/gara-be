import { Invoice, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllInvoicesDb = async ({ take, skip }) => {
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
  const invoices = await prisma.$transaction([
    prisma.invoice.findMany({ ...query }),
    prisma.invoice.count(),
  ]);
  return {
    data: invoices[0],
    total: invoices[1],
    pagination: {
      take,
      skip,
    },
  };
};

export const getInvoiceDb = async (id) => {
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: id,
    },
  });
  return invoice;
};

export const createInvoiceDb = async (data: Invoice) => {
  const invoice = await prisma.invoice.create({
    data: data,
  });
  return invoice;
};

export const updateInvoiceDb = async (id, data) => {
  const invoice = await prisma.invoice.update({
    where: {
      id: id,
    },
    data: data,
  });
  return invoice;
};
