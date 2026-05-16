-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_sleepAnalysisId_fkey";

-- DropForeignKey
ALTER TABLE "SleepAnalysis" DROP CONSTRAINT "SleepAnalysis_userId_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "sleepQuality" SET DATA TYPE TEXT;
