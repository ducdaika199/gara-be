import {
  createInvoiceDb,
  getAllInvoicesDb,
  getInvoiceDb,
  updateInvoiceDb,
} from '../data-access/invoice-repository';
import { InvoiceModel } from '../data-access/model/invoice-model';

export const getAllInvoices = async (req) => {
  const { take, skip } = req.query;
  const invoices = await getAllInvoicesDb({ take, skip });
  return invoices;
};

export const getInvoice = async (id) => {
  const invoice = await getInvoiceDb(id);
  return invoice;
};

export const createInvoice = async (data: InvoiceModel) => {
  const invoice = await createInvoiceDb(data);
  return invoice;
};

export const updateInvoice = async (id, data) => {
  const invoice = await updateInvoiceDb(id, data);
  return invoice;
};
