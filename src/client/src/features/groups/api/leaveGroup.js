import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const leaveGroup = ( id )=> {
  return axios.delete(`/group/leave/${id}`);
};

export const useLeaveGroup = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
    },
    onError: (error) => {
      return error
    },
    mutationFn: leaveGroup,
  });
};

