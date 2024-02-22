import { logger } from '@practica/logger';
import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import * as pdfUseCase from '../../domain/pdf-use-case';

export const pdfRoutes = () => {
  const router = express.Router();
  router.get('/', handleRenderPdfInvoice);

  async function handleRenderPdfInvoice(req, res, next) {
    try {
      logger.info('check call function handle pdf invoice');
      const browser = await puppeteer.launch({
        headless: 'new',
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
      });
      const page = await browser.newPage();
      const html = fs.readFileSync('sample.html', 'utf-8');
      await page.setContent(html, { waitUntil: 'load' });
      await page.emulateMediaType('screen');

      const pdf = await page.pdf({
        path: 'result.pdf',
        margin: { top: '40px', right: '20px', bottom: '50px', left: '20px' },
        printBackground: true,
        format: 'A4',
      });

      await browser.close();
      res.set("Content-Type", "application/pdf");
      res.send(pdf);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};
