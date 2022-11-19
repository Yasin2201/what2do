import { useParams } from "react-router-dom"
import { useGroup } from "../api/getGroup"

export const GroupSingle = () => {
  const { id } = useParams()
  const groupQuery = useGroup(id) 

  if (groupQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        Loading....
      </div>
    );
  }

  if (!groupQuery.data) return null;

  const { data } = groupQuery.data

  return (
    <div>
      <a href="/groups" className="underline" >Back</a>
      <p>
        title: {data.usersGroup.group.name}
      </p>
      <p>
        id: {data.usersGroup.groupId}
      </p>
    </div>
  )
}