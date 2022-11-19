import { ContentLayout } from "@/components/Layout/ContentLayout"
import { ActivitysList } from "../components/ActivitysList"

export const Activitys = () => {
  return (
    <ContentLayout title="Activities">
      <div className="mt-4">
        <ActivitysList />
      </div>
    </ContentLayout>
  )
}