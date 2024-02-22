/*
  Warnings:

  - The `type` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TypeWork" AS ENUM ('SUPPLIES', 'REPAIRS');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "type",
ADD COLUMN     "type" "TypeWork" NOT NULL DEFAULT 'SUPPLIES';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
