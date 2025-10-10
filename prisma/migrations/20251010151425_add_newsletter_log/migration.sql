-- CreateTable
CREATE TABLE "NewsletterLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "removedCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" BIGINT,

    CONSTRAINT "NewsletterLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NewsletterLog" ADD CONSTRAINT "NewsletterLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("chatId") ON DELETE SET NULL ON UPDATE CASCADE;
