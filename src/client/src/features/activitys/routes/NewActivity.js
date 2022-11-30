import { ContentLayout } from "@/components/Layout/ContentLayout"
import { CreateActivity } from "../components/CreateActivity"

export const NewActivity = () => {
  return (
    <ContentLayout title="Create Activity">
      <div className="flex mt-4 border rounded-md justify-center">
        <CreateActivity />
      </div>
    </ContentLayout>
  )
}