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

  const activity = activityQuery.data.data.activity[0]

  return (
    <div>
      <a href="/activitys" className="underline">Back</a>
      <p>
        group: {activity.name}
      </p>
      <p>
        status: {activity.status}
      </p>
    </div>
  )
}