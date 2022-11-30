import { GroupDropdown } from "@/components/Elements/Dropdown/GroupDropdown";
import { ActivityTypeDropdown } from "@/components/Elements/Dropdown/ActivityTypeDropdown";
import { useNavigate } from "react-router-dom";
import { useCreateActivity } from "../api/createActivity";
import { DistanceDropdown } from "@/components/Elements/Dropdown/DistanceDropdown";
import { useState } from "react";

export const CreateActivity = () => {
  const [typeSelected, setTypeSelected] = useState(undefined)
  const [error, setError] = useState(null)
  const createActivityMutation = useCreateActivity();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {activityName, groupId, distanceId} = e.target.elements
    const data = {
      name: activityName.value,
      groupId: groupId.value,
      distance: distanceId.value,
      typeSelected
    }
    await createActivityMutation.mutateAsync(data)
    .then((res) => res.status === 200 ? navigate(`/activity/${res.data.activity.id}`) : null)
    .catch(e => setError(e.response.data.error))
  }
  
  return (
    <div className="max-w-5xl p-5">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="activityName" className="font-medium text-md text-gray-700">Name</label>
          <input type="text" name="activityName" id="activityName" placeholder="New Activity" className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"/>
        </div>
        <GroupDropdown />
        <DistanceDropdown />
        <ActivityTypeDropdown typeSelected={typeSelected} setTypeSelected={setTypeSelected} />
        <div className="mt-5">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded">
            Submit
          </button>
        </div>
      </form>
      {
        error && 
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      }
    </div>
  );
}
