import { Modal } from "@/components/Elements/Modal";
import { useState } from "react"
import { useCreateGroup } from "../api/createGroup";

export const CreateGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const createGroupMutation = useCreateGroup();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name} = e.target.elements
    await createGroupMutation.mutateAsync(name.value)
    setShowModal(false)
  }
  
  return (
    <>
      <div className="m-1">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)}>
          New Group
        </button>
      </div>
      {showModal ? (
        <>
          <Modal title="Create New Group">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="text-gray-700 text-lg font-medium">Group Name</label>
                <input id="name" type="text" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="flex p-5 w-full justify-evenly">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded"
                    type="button"
                    onClick={() => setShowModal(false)}
                    >
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" type="submit" disabled={createGroupMutation.isLoading ? true : false}>
                    Save Group
                </button>
              </div>
            </form>
          </Modal>
        </>
      ) : null}
    </>
  );
}
