import { Link, useParams } from "react-router-dom"
import { useActivity } from "../../../api/getActivity"
import { ActivityUsers } from "../../ActivityUsers"
import { DeleteActivity } from "../../DeleteActivity"
import { CompleteActivity } from "./CompleteActivity"

export const Active = () => {
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
      <CompleteActivity id={activity.id} isAdmin={activity.isAdmin}/>
      <DeleteActivity id={activity.id} isAdmin={activity.isAdmin} activity={activity}/>
      <Link to={`/activitys/${status}`} className="underline">Back</Link>
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