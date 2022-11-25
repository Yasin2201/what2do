import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

export const getActivitys = ({status}) => {
  return axios.get(`/activitys/${status}`)
}

export const useActivitys = (status) => {
  return useQuery({
    queryKey: ['activitys', status],
    queryFn: () => getActivitys({status})
  })
}