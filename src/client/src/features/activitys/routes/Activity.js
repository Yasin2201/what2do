import { ContentLayout } from "@/components/Layout/ContentLayout"
import { ActivitySingle } from "../components/ActivitySingle"

export const Activity = () => {
  return (
    <ContentLayout title="Activity">
      <div className="mt-4">
        <ActivitySingle />
      </div>
    </ContentLayout>
  )
}