-- CreateEnum
CREATE TYPE "Status" AS ENUM ('VOTING', 'ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "ActivityGroup" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'VOTING';
