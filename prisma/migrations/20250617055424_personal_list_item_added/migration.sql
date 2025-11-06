-- CreateEnum
CREATE TYPE "DatePlan" AS ENUM ('TODAY', 'TOMORROW', 'DAY_AFTER_TOMORROW');

-- CreateTable
CREATE TABLE "PersonalListItem" (
    "id" TEXT NOT NULL,
    "ingrediantName" TEXT NOT NULL,
    "tags" "DatePlan" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealType" "MealType" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "PersonalListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalListItem" ADD CONSTRAINT "PersonalListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
