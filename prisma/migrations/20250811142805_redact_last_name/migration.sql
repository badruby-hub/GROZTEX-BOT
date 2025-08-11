/*
  Warnings:

  - You are about to drop the column `listName` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "listName",
ADD COLUMN     "lastName" TEXT;
