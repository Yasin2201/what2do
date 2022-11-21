import { axios } from "@/lib/axios";
import { useMutation } from "react-query";
import { queryClient } from "@/lib/react-query";

export const deleteActivity = (activityId) => {
  return axios.delete(`/activity/${activityId}`)
}

export const useDeleteActivity = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('activitys');
    },
    onError: (error) => {
      throw new Error(error.response.data.error)
    }, 
    mutationFn: deleteActivity
  })
}