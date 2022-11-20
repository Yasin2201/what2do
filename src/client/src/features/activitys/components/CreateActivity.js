import { GroupDropdown } from "@/components/Elements/Dropdown/GroupDropdown";
import { Modal } from "@/components/Elements/Modal";
import { useState } from "react"
import { useCreateActivity } from "../api/createActivity";

export const CreateActivity = () => {
  const [showModal, setShowModal] = useState(false);
  const createActivityMutation = useCreateActivity();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, groupId} = e.target.elements
    const data = {
      name: name.value,
      groupId: groupId.value
    }
    await createActivityMutation.mutateAsync(data)
    setShowModal(false)
  }
  
  return (
    <>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)}>
          New Activity
        </button>
      </div>
      {showModal ? (
        <>
          <Modal title="Create New Activity">
            <form onSubmit={handleSubmit} className="flex flex-col items-start justify-evenly border-b border-solid border-slate-200 rounded-t">
              <div className="p-5">
                <label htmlFor="name" className="text-gray-700 text-lg font-medium">Activity Name</label>
                <input id="name" type="text" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <GroupDropdown />
              <div className="flex p-5 w-full justify-evenly">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded"
                    type="button"
                    onClick={() => setShowModal(false)}
                    >
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" type="submit" disabled={createActivityMutation.isLoading ? true : false}>
                    Save Activity
                </button>
              </div>
            </form>
          </Modal>
        </>
      ) : null}
    </>
  );
}
