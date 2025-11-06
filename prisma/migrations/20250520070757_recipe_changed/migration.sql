/*
  Warnings:

  - You are about to drop the column `macronutrientId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `nutrientHighlightsId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Macronutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NutrientHighlight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_macronutrientId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_nutrientHighlightsId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "macronutrientId",
DROP COLUMN "nutrientHighlightsId",
ALTER COLUMN "steps" DROP NOT NULL;

-- DropTable
DROP TABLE "Macronutrient";

-- DropTable
DROP TABLE "NutrientHighlight";
