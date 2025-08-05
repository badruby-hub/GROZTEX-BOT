-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_authorId_fkey";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "authorId" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;
