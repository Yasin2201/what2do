import { useParams } from "react-router-dom"
import { useGroup } from "../api/getGroup"
import { GroupUsers } from "./GroupUsers"
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

  const { groupData } = groupQuery.data.data

  return (
    <div>
      <DeleteGroup id={groupData.id} isAdmin={groupData.isAdmin} group={groupData}/>
      <a href="/groups" className="underline">Back</a>
      <p>
        title: {groupData.name}
      </p>
      <p>
        id: {groupData.id}
      </p>
      <div>
        <GroupUsers users={groupData.users}/>
      </div>
    </div>
  )
}