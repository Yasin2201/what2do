import { ContentLayout } from "@/components/Layout/ContentLayout"
import { Completed } from "../components/status/Completed"

export const ActivityCompleted = () => {
  return (
    <ContentLayout title="Activity">
      <div className="mt-4">
        <Completed />
      </div>
    </ContentLayout>
  )
}