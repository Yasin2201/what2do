import { useNavigate } from "react-router-dom"
import { useDeleteGroup } from "../api/deleteGroup"

export const DeleteGroup = ({id, isAdmin}) => {
  const deleteGroupMutation = useDeleteGroup()
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
    isAdmin && 
    <div className="flex justify-end">
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded" type="button" onClick={handleDelete} >
        Delete Group
      </button>
    </div>
  )
}