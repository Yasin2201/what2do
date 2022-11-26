import { useParams } from "react-router-dom"
import { useActivity } from "../api/getActivity"
import { ActivityUsers } from "./ActivityUsers"
import { DeleteActivity } from "./DeleteActivity"

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

  const { activity } = activityQuery.data.data
  const status = activity.status.toLowerCase()

  return (
    <div>
      <DeleteActivity id={activity.id} isAdmin={activity.isAdmin} activity={activity}/>
      <a href={`/activitys/${status}`} className="underline">Back</a>
      <p>
        group: {activity.name}
      </p>
      <p>
        status: {activity.status}
      </p>
      <div>
        <ActivityUsers users={activity.group.users}/>
      </div>
    </div>
  )
}