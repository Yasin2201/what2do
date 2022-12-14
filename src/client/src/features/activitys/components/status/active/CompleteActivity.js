import { Modal } from "@/components/Elements/Modal"
import { useCompleteActivity } from "@/features/activitys/api/completeActivity"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CompleteActivity = ({id, isAdmin}) => {
  const [showModal, setShowModal] = useState(false)
  const completeActivityMutation = useCompleteActivity()
  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    await completeActivityMutation.mutateAsync(id)
    .then(res => {
      if (res.status === 200) {
        return navigate("/activitys/completed")
      }
    })
    .catch(err => {
      throw Error(err)
    })
  }

  return (
    isAdmin && 
    <>
      <div className="flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)} >
          Completed
        </button>
      </div>
      {showModal ? (
      <Modal title="Activity Completed?">
        <div className="flex flex-col p-5 w-full text-center">
          <div className="flex justify-evenly">
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-5 rounded"
                type="button"
                onClick={() => setShowModal(false)}
                >
                No
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-5 rounded" type="button" onClick={handleUpdate}>
                Yes
            </button>
          </div>
        </div>
      </Modal>
      ) : null}
    </>
  )
}