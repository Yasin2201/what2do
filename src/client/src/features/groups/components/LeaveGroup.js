import { Modal } from "@/components/Elements/Modal";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useLeaveGroup } from "../api/leaveGroup";

export const LeaveGroup = () => {
  const { id } = useParams()
  const navigate = useNavigate ()
  const [showModal, setShowModal] = useState(false);
  const leaveGroupMutation = useLeaveGroup();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await leaveGroupMutation.mutateAsync(id)
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
        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-5 rounded" type="button" onClick={() => setShowModal(true)}>
          Leave Group
        </button>
      </div>
      {showModal ? (
        <>
          <Modal title="Leave Group">
              <p>Are you sure you want to leave?</p>
              <div className="flex py-5 w-full justify-evenly">
                <button 
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-5 rounded"
                  type="button"
                  onClick={() => {setShowModal(false)}}
                >
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded" 
                  type="button" 
                  disabled={leaveGroupMutation.isLoading ? true : false}
                  onClick={handleSubmit}
                >
                    Confirm
                </button>
              </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}
