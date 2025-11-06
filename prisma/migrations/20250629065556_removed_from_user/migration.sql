/*
  Warnings:

  - You are about to drop the column `foodPreferences` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `specificFitnessInterest` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "foodPreferences",
DROP COLUMN "specificFitnessInterest";

-- DropEnum
DROP TYPE "FitnessInterest";
