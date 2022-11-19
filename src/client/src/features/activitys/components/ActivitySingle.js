import { useParams } from "react-router-dom"
import { useActivity } from "../api/getActivity"

export const ActivitySingle = () => {
  const { id } = useParams()
  const activityQuery = useActivity(id)

  if (activityQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        Loading....
      </div>
    )
  }

  if (!activityQuery.data) return null

  return null
}