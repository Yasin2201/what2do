import { ContentLayout } from "@/components/Layout/ContentLayout"
import { GroupSingle } from "../components/GroupSingle"

export const Group = () => {
  return (
    <ContentLayout title="Group">
      <div className="mt-4">
        <GroupSingle />
      </div>
    </ContentLayout>
  )
}