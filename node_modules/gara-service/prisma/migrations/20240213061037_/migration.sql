/*
  Warnings:

  - You are about to drop the `_InvoiceToInvoiceRepair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_InvoiceToInvoiceSupplie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invoiceId` to the `InvoiceRepair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `InvoiceSupplie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceToInvoiceRepair" DROP CONSTRAINT "_InvoiceToInvoiceRepair_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToInvoiceRepair" DROP CONSTRAINT "_InvoiceToInvoiceRepair_B_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToInvoiceSupplie" DROP CONSTRAINT "_InvoiceToInvoiceSupplie_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToInvoiceSupplie" DROP CONSTRAINT "_InvoiceToInvoiceSupplie_B_fkey";

-- AlterTable
ALTER TABLE "InvoiceRepair" ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceSupplie" ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_InvoiceToInvoiceRepair";

-- DropTable
DROP TABLE "_InvoiceToInvoiceSupplie";

-- AddForeignKey
ALTER TABLE "InvoiceRepair" ADD CONSTRAINT "InvoiceRepair_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceSupplie" ADD CONSTRAINT "InvoiceSupplie_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
