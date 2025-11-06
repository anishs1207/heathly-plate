-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('MUSCLE_GAIN', 'WEIGHT_LOSS', 'WEIGHT_GAIN');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('ACTIVE', 'MODERATE', 'LESS_ACTIVE');

-- CreateEnum
CREATE TYPE "FitnessInterest" AS ENUM ('STRENGTH_TRAINING', 'CARDIO', 'FLEXIBILITY', 'YOGA', 'ZUMBA');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "goal" "Goal" NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "targetWeight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION,
    "workoutCommitment" INTEGER NOT NULL,
    "foodPreferences" TEXT[],
    "specificFitnessInterest" "FitnessInterest"[],
    "calorieRequirement" DOUBLE PRECISION NOT NULL,
    "proteinRequirement" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "timeToPrepare" INTEGER NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "ingredients" TEXT[],
    "mealType" "MealType" NOT NULL,
    "steps" JSONB NOT NULL,
    "macronutrientId" TEXT NOT NULL,
    "nutrientHighlightsId" TEXT NOT NULL,
    "skillLevel" "SkillLevel" NOT NULL,
    "cuisine" TEXT[],
    "foodPreferences" JSONB NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Macronutrient" (
    "id" TEXT NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Macronutrient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutrientHighlight" (
    "id" TEXT NOT NULL,
    "richInIron" BOOLEAN NOT NULL,
    "highInFiber" BOOLEAN NOT NULL,

    CONSTRAINT "NutrientHighlight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_macronutrientId_fkey" FOREIGN KEY ("macronutrientId") REFERENCES "Macronutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_nutrientHighlightsId_fkey" FOREIGN KEY ("nutrientHighlightsId") REFERENCES "NutrientHighlight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
