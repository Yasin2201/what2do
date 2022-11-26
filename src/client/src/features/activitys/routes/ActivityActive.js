import { ContentLayout } from "@/components/Layout/ContentLayout"
import { Active } from "../components/status/Active"

export const ActivityActive = () => {
  return (
    <ContentLayout title="Activity">
      <div className="mt-4">
        <Active />
      </div>
    </ContentLayout>
  )
}