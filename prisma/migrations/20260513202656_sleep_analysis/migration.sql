/*
  Warnings:

  - You are about to drop the column `amount` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `bedtime` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `interruptions` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `screenTime` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `sleepHours` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `sleepQuality` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `stressLevel` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SleepAnalysis` table. All the data in the column will be lost.
  - You are about to drop the column `wakeTime` on the `SleepAnalysis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recordId]` on the table `SleepAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sleepHours` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleepQuality` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detectedIssues` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendations` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleepScore` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `SleepAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_userId_fkey";

-- DropIndex
DROP INDEX "Record_userId_idx";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "amount",
DROP COLUMN "date",
DROP COLUMN "text",
ADD COLUMN     "bedtime" TEXT,
ADD COLUMN     "interruptions" INTEGER,
ADD COLUMN     "screenTime" DOUBLE PRECISION,
ADD COLUMN     "sleepHours" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sleepQuality" INTEGER NOT NULL,
ADD COLUMN     "stressLevel" INTEGER,
ADD COLUMN     "wakeTime" TEXT;

-- AlterTable
ALTER TABLE "SleepAnalysis" DROP COLUMN "bedtime",
DROP COLUMN "interruptions",
DROP COLUMN "screenTime",
DROP COLUMN "sleepHours",
DROP COLUMN "sleepQuality",
DROP COLUMN "stressLevel",
DROP COLUMN "userId",
DROP COLUMN "wakeTime",
ADD COLUMN     "detectedIssues" JSONB NOT NULL,
ADD COLUMN     "recommendations" JSONB NOT NULL,
ADD COLUMN     "recordId" TEXT NOT NULL,
ADD COLUMN     "sleepScore" INTEGER NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SleepAnalysis_recordId_key" ON "SleepAnalysis"("recordId");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepAnalysis" ADD CONSTRAINT "SleepAnalysis_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
