-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "carName" TEXT,
    "carType" TEXT,
    "joinDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reparis" (
    "id" SERIAL NOT NULL,
    "repairsCode" TEXT NOT NULL,
    "description" TEXT,
    "countUnit" TEXT,
    "priceUnit" DECIMAL(65,30) NOT NULL,
    "ck" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Reparis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplies" (
    "id" SERIAL NOT NULL,
    "suppliesCode" TEXT NOT NULL,
    "description" TEXT,
    "countUnit" TEXT,
    "priceUnit" DECIMAL(65,30) NOT NULL,
    "ck" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Supplies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "userRequest" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceRepair" (
    "id" SERIAL NOT NULL,
    "repairId" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "InvoiceRepair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceSupplie" (
    "id" SERIAL NOT NULL,
    "supplieId" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "InvoiceSupplie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToInvoiceRepair" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InvoiceToInvoiceSupplie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToInvoiceRepair_AB_unique" ON "_InvoiceToInvoiceRepair"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToInvoiceRepair_B_index" ON "_InvoiceToInvoiceRepair"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToInvoiceSupplie_AB_unique" ON "_InvoiceToInvoiceSupplie"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToInvoiceSupplie_B_index" ON "_InvoiceToInvoiceSupplie"("B");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToInvoiceRepair" ADD CONSTRAINT "_InvoiceToInvoiceRepair_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToInvoiceRepair" ADD CONSTRAINT "_InvoiceToInvoiceRepair_B_fkey" FOREIGN KEY ("B") REFERENCES "InvoiceRepair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToInvoiceSupplie" ADD CONSTRAINT "_InvoiceToInvoiceSupplie_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToInvoiceSupplie" ADD CONSTRAINT "_InvoiceToInvoiceSupplie_B_fkey" FOREIGN KEY ("B") REFERENCES "InvoiceSupplie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
