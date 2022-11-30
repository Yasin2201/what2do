-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TEST', 'FUN', 'RELAX', 'NIGHT', 'FOOD');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "distance" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'FUN';
