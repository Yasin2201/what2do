import { useGroups } from "@/features/groups/api/getGroups"

export const GroupDropdown = () => {
  const groupsQuery = useGroups()

  if (groupsQuery.isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        Loading....
      </div>
    );
  }

  if (!groupsQuery.data) return null;

  const { allGroups } = groupsQuery.data.data

  return (
    <div className="mt-5">
      <label className="text-gray-700 text-md font-medium">Group</label>
      <select id="groupId" required defaultValue={""} className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
        <option value="" disabled>Select Group</option>
        {
          allGroups.map((group => {
            return (
              <option key={group.groupId} value={group.groupId}>{group.group.name}</option>
            )
          }))
        }
      </select>
    </div>
  )
}