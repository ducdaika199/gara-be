import { Invoice, PrismaClient } from '@prisma/client';
import { InvoiceModel } from './model/invoice-model';

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
    include: {
      invoiceItems: {
        select: {
          quantity: true,
          id: true,
          product: true,
        },
      },
      user: true,
    },
  });
  return invoice;
};

export const createInvoiceDb = async (data: InvoiceModel) => {
  const { userRequest, userId, invoiceItems } = data;
  const invoice = await prisma.invoice.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      userRequest,
      invoiceItems: {
        createMany: {
          data: invoiceItems,
        },
      },
    },
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
