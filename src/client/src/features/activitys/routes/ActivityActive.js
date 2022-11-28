import { ContentLayout } from "@/components/Layout/ContentLayout"
import { Active } from "../components/status/active/Active"

export const ActivityActive = () => {
  return (
    <ContentLayout title="Activity">
      <div className="mt-4">
        <Active />
      </div>
    </ContentLayout>
  )
}