/*
  Warnings:

  - You are about to drop the column `content` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Recipe` table. All the data in the column will be lost.
  - The `steps` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `calories_kcal` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "content",
DROP COLUMN "image",
ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "steps",
ADD COLUMN     "steps" TEXT[],
ALTER COLUMN "calories_kcal" SET DATA TYPE INTEGER;
