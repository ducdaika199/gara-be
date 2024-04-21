import { logger } from '@practica/logger';
import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import * as pdfUseCase from '../../domain/pdf-use-case';
import { getHtmlPdfFile } from '../../domain/pdf-use-case';
import { secure } from '@practica/jwt-token-verifier/lib/secure';

export const pdfRoutes = () => {
  const router = express.Router();
  router.get('/invoice/:id', secure(), handleRenderPdfInvoice);

  async function handleRenderPdfInvoice(req, res, next) {
    try {
      logger.info('check call function handle pdf invoice');
      const id = req.params.id;
      const browser = await puppeteer.launch({
        headless: 'new',
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
      });
      const page = await browser.newPage();
      const html = await getHtmlPdfFile(+id);
      await page.setContent(html, { waitUntil: 'load' });
      await page.emulateMediaType('screen');

      const pdf = await page.pdf({
        path: 'result.pdf',
        margin: { top: '40px', right: '20px', bottom: '50px', left: '20px' },
        printBackground: true,
        format: 'A4',
      });

      await browser.close();
      res.set('Content-Type', 'application/pdf');
      res.send(pdf);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  return router;
};
