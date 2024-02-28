import {
  createInvoiceDb,
  getAllInvoicesDb,
  getInvoiceDb,
  updateInvoiceDb,
} from '../data-access/invoice-repository';
import { getProduct } from './product-use-case';
import { getUser } from './user-use-case';

export const getAllInvoices = async (req) => {
  const { take, skip } = req.query;
  const invoices = await getAllInvoicesDb({ take, skip });
  return invoices;
};

export const getInvoice = async (id) => {
  const invoice = await getInvoiceDb(id);
  return invoice;
};

export const createInvoice = async (data) => {
  const user = getUser(data?.userId);
  const dataItems = data?.invoiceItems;
  const dataInvoice = {
    userRequest: data?.userRequest,
    user: user,
    invoiceItems: [dataItems],
    userId: data?.userId,
  };
  const invoice = await createInvoiceDb(data);
  return invoice;
};

export const updateInvoice = async (id, data) => {
  const invoice = await updateInvoiceDb(id, data);
  return invoice;
};
