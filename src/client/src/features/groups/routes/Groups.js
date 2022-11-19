import { ContentLayout } from "@/components/Layout/ContentLayout"
import { GroupsList } from "../components/GroupsList"

export const Groups = () => {
  return (
    <ContentLayout title="Groups">
      <div className="mt-4">
        <GroupsList />
      </div>
    </ContentLayout>
  )
}