import { ContentLayout } from "@/components/Layout/ContentLayout"
import { CreateGroup } from "../components/CreateGroup"
import { GroupsList } from "../components/GroupsList"

export const Groups = () => {
  return (
    <ContentLayout title="Groups">
      <CreateGroup />
      <div className="mt-4">
        <GroupsList />
      </div>
    </ContentLayout>
  )
}