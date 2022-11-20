import { useParams } from "react-router-dom"
import { useGroup } from "../api/getGroup"
import { DeleteGroup } from "./DeleteGroup"

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

  const { usersGroup } = groupQuery.data.data

  return (
    <div>
      <DeleteGroup id={usersGroup.groupId} isAdmin={usersGroup.admin}/>
      <a href="/groups" className="underline" >Back</a>
      <p>
        title: {usersGroup.group.name}
      </p>
      <p>
        id: {usersGroup.groupId}
      </p>
    </div>
  )
}