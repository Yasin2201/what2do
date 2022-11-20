import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";

export const deleteGroup = (groupId) => {
  return axios.delete(`/group/${groupId}`)
}

export const useDeleteGroup = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
    },
    onError: (error) => {
      throw new Error(error.response.data.error)
    }, 
    mutationFn: deleteGroup
  })
}