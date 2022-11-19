import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

export const getGroup = ({groupId}) => {
  return axios.get(`/group/${groupId}`)
}

export const useGroup = (groupId) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup({ groupId })
  })
}