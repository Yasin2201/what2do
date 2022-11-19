import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

export const getActivitys = () => {
  return axios.get("/activitys")
}

export const useActivitys = () => {
  return useQuery({
    queryKey: ['activitys'],
    queryFn: () => getActivitys()
  })
}