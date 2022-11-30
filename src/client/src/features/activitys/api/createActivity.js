import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const createActivity = (data) => {
  return axios.post(`/activitys`, data);
};

export const useCreateActivity  = () => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('activitys');
    },
    onError: (error) => {
      return error
    },
    mutationFn: createActivity,
  });
};

