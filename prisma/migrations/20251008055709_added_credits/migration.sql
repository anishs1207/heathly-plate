-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('FREE', 'PRO', 'PREMIUM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" BIGINT NOT NULL DEFAULT 10,
ADD COLUMN     "tierPlan" "Plans" NOT NULL DEFAULT 'FREE';
