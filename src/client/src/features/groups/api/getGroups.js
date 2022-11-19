import { axios } from "@/lib/axios";
import { useQuery } from "react-query";


export const getGroups = () => {
  return axios.get("/groups")
}

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups()
  })
}