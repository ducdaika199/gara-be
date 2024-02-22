/*
  Warnings:

  - You are about to drop the `InvoiceRepair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceSupplie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reparis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvoiceRepair" DROP CONSTRAINT "InvoiceRepair_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceSupplie" DROP CONSTRAINT "InvoiceSupplie_invoiceId_fkey";

-- DropTable
DROP TABLE "InvoiceRepair";

-- DropTable
DROP TABLE "InvoiceSupplie";

-- DropTable
DROP TABLE "Reparis";

-- DropTable
DROP TABLE "Supplies";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "countUnit" TEXT,
    "priceUnit" DECIMAL(65,30) NOT NULL,
    "ck" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
