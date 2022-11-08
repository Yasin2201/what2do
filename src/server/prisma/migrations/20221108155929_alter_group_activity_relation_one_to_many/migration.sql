/*
  Warnings:

  - You are about to drop the `ActivityGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityGroup" DROP CONSTRAINT "ActivityGroup_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityGroup" DROP CONSTRAINT "ActivityGroup_groupId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "groupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ActivityGroup";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
