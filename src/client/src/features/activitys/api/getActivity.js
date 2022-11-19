import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

export const getActivity = ({activityId}) => {
  return axios.get(`/activity/${activityId}`)
}

export const useActivity = (activityId) => {
  return useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivity({activityId})
  })
}