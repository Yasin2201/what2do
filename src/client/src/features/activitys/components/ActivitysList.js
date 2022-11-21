import { useActivitys } from "../api/getActivitys";

export const ActivitysList = () => {
  const activitysQuery = useActivitys()

  if (activitysQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        Loading....
      </div>
    )
  }

  if (!activitysQuery.data) return null;

  const { data } = activitysQuery.data

  return (
    <div>
      {data.allActivities.map((activity) => {
        return (
          <a href={`/activity/${activity.activity_id}`} key={activity.activity_id} >
            <div className="border border-black p-2 my-2 ">
              <p>Name: {activity.activity_name}</p>
              <p>Group: {activity.group_name}</p>
              <p>Status: {activity.status}</p>
              <p>Created By: {activity.createdUser}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}