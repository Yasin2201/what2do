import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const createGroup = ( name )=> {
  return axios.post(`/groups`, {name});
};

export const useCreateGroup = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
    },
    onError: () => {
      throw Error("Something went wrong")
    },
    mutationFn: createGroup,
  });
};

