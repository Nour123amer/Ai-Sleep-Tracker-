/*
  Warnings:

  - You are about to drop the column `recordId` on the `SleepAnalysis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `SleepAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SleepAnalysis" DROP CONSTRAINT "SleepAnalysis_recordId_fkey";

-- DropIndex
DROP INDEX "SleepAnalysis_recordId_key";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "sleepAnalysisId" TEXT;

-- AlterTable
ALTER TABLE "SleepAnalysis" DROP COLUMN "recordId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SleepAnalysis_userId_key" ON "SleepAnalysis"("userId");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_sleepAnalysisId_fkey" FOREIGN KEY ("sleepAnalysisId") REFERENCES "SleepAnalysis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepAnalysis" ADD CONSTRAINT "SleepAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
