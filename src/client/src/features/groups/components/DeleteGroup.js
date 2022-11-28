import { Modal } from "@/components/Elements/Modal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteGroup } from "../api/deleteGroup"

export const DeleteGroup = ({id, group}) => {
  const deleteGroupMutation = useDeleteGroup()
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    await deleteGroupMutation.mutateAsync(id)
      .then(res => {
        if (res.status === 200) {
          return navigate("/groups")
        }
      })
      .catch(err => {
        throw Error(err)
      })
  }

  return (
    <>
      <div className="flex justify-end">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)} >
          Delete Group
        </button>
      </div>
      {showModal ? (
      <Modal title="Delete Group">
        <div className="flex flex-col w-full text-center">
          <p className="text-gray-800 text-semibold">Are you sure you want to delete group: {group.name}</p>
          <div className="flex justify-evenly py-5">
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-5 rounded"
                type="button"
                onClick={() => setShowModal(false)}
                >
                Cancel
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded" type="button" onClick={handleDelete}>
                Delete
            </button>
          </div>
        </div>
      </Modal>
      ) : null}
    </>
  )
}