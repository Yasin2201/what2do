import { Link } from "react-router-dom";
import { useGroups } from "../api/getGroups"

export const GroupsList = () => {
  const groupsQuery = useGroups()

  if (groupsQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        Loading....
      </div>
    );
  }

  if (!groupsQuery.data) return null;

  return (
    <ul>
      {
        groupsQuery.data.data.allGroups.map(({group}) => {
          return (
            <li key={group.id}>
              <Link to={`/group/${group.id}`}>{group.name}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}