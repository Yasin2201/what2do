import { axios } from "@/lib/axios";
import { useQuery } from "react-query";

export const getVotingActivitys = () => {
  return axios.get("/activitys/voting")
}

export const useVotingActivitys = () => {
  return useQuery({
    queryKey: ['activitysVoting'],
    queryFn: () => getVotingActivitys()
  })
}