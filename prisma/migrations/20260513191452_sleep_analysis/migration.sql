-- CreateTable
CREATE TABLE "SleepAnalysis" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sleepHours" DOUBLE PRECISION NOT NULL,
    "sleepQuality" INTEGER NOT NULL,
    "bedtime" TEXT,
    "wakeTime" TEXT,
    "stressLevel" INTEGER,
    "interruptions" INTEGER,
    "screenTime" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SleepAnalysis_pkey" PRIMARY KEY ("id")
);
