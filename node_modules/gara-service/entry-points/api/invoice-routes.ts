import { logger } from '@practica/logger';
import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoice,
  updateInvoice,
} from '../../domain/invoice-use-case';

export const invoiceRoutes = () => {
  const router = express.Router();
  router.get('/', handleSelectInvoices);
  router.post('/', handleCreateInvoice);
  router.get('/:id', handleSelectInvoiceById);
  router.put('/:id', handleUpdateInvoiceById);

  async function handleSelectInvoices(req, res, next) {
    try {
      logger.info('check call function handle select invoices');
      const invoices = await getAllInvoices(req);
      return res.status(200).json(invoices);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleSelectInvoiceById(req, res, next) {
    try {
      logger.info('check call function handle select invoice');
      const id = req.params.id;
      const invoice = await getInvoice(+id);
      return res.status(200).json(invoice);
    } catch (error) {
      next(error);
      return undefined;
    }
  }

  async function handleCreateInvoice(req, res, next) {
    try {
      logger.info('Check call function handle create invoice');
      const data = req.body;
      const invoice = await createInvoice(data);
      return res.status(200).json(invoice);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};

async function handleUpdateInvoiceById(req, res, next) {
  try {
    logger.info('Check call function handle update user by id');
    const id = req.params.id;
    const data = req.body;
    const invoice = await updateInvoice(id, data);
    return res.status(200).json(invoice);
  } catch (error) {
    next(error);
    return undefined;
  }
}
