import { ContentLayout } from "@/components/Layout/ContentLayout"
import { CreateGroup } from "../components/CreateGroup"
import { GroupsList } from "../components/GroupsList"
import { JoinGroup } from "../components/JoinGroup"

export const Groups = () => {
  return (
    <ContentLayout title="Groups">
      <div className="flex justify-end">
        <JoinGroup />
        <CreateGroup />
      </div>
      <div className="mt-4">
        <GroupsList />
      </div>
    </ContentLayout>
  )
}