import { ContentLayout } from "@/components/Layout/ContentLayout"
import { ActivitysList } from "../components/ActivitysList"
import { CreateActivity } from "../components/CreateActivity"

export const Activitys = () => {
  return (
    <ContentLayout title="Activities">
      <CreateActivity />
      <div className="mt-4 h-[75vh] overflow-scroll">
        <ActivitysList />
      </div>
    </ContentLayout>
  )
}