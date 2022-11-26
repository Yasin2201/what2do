import { Link, useParams } from "react-router-dom";
import { useActivitys } from "../api/getActivitys";

export const ActivitysList = () => {
  const { status } = useParams()
  const activitysQuery = useActivitys(status)

  if (activitysQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        Loading....
      </div>
    )
  }

  if (!activitysQuery.data) return null;

  const { allActivitys } = activitysQuery.data.data

  return (
    <div>
      {allActivitys.map((activity) => {
        return (
          <Link to={`/activity/${activity.id}`} key={activity.id}>
            <div className="border border-black p-2 my-2 ">
              <p>Name: {activity.name}</p>
              <p>Group: {activity.group.name}</p>
              <p>Status: {activity.status}</p>
              <p>Created By: {activity.user.username}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}