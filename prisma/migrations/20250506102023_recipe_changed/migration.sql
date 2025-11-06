/*
  Warnings:

  - You are about to drop the column `calories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `timeToPrepare` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `calories_kcal` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favourite` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein_g` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "calories",
DROP COLUMN "proteins",
DROP COLUMN "timeToPrepare",
ADD COLUMN     "calories_kcal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "content" TEXT[],
ADD COLUMN     "favourite" BOOLEAN NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "protein_g" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
