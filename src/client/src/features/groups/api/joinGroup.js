import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const joinGroup = ( groupId )=> {
  return axios.post(`/group/join`, {groupId});
};

export const useJoinGroup = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
    },
    onError: (error) => {
      return error
    },
    mutationFn: joinGroup,
  });
};

