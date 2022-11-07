-- CreateTable
CREATE TABLE "ActivityGroup" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "ActivityGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityGroup" ADD CONSTRAINT "ActivityGroup_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityGroup" ADD CONSTRAINT "ActivityGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
