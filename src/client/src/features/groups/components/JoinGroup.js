import { Modal } from "@/components/Elements/Modal";
import { useState } from "react"
import { useJoinGroup } from "../api/joinGroup";

export const JoinGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const {mutateAsync, isLoading} = useJoinGroup(null);
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { groupId } = e.target.elements
    await mutateAsync(groupId.value)
    .then(res => setShowModal(false))
    .catch(e => setError(e.response.data.error))
  }

  return (
    <>
      <div className="m-1">
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)}>
          Join Group
        </button>
      </div>
      {showModal ? (
        <>
          <Modal title="Join New Group" error={error}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="groupId" className="text-gray-700 text-lg font-medium">Join Code</label>
                <input id="groupId" type="text" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="flex w-full justify-evenly py-5">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-5 rounded"
                    type="button"
                    onClick={
                      () => { 
                      setShowModal(false)
                      setError(null)
                      }
                    }
                    >
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" type="submit" disabled={isLoading ? true : false}>
                    Join Group
                </button>
              </div>
            </form>
          </Modal>
        </>
      ) : null}
    </>
  );
}
