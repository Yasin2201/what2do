import { axios } from "@/lib/axios";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "react-query";

export const completeActivity = (activityId) => {
  return axios.put(`/activity/complete/${activityId}`)
};

export const useCompleteActivity  = (activityId) => {
  return useMutation({
    onSuccess: () => {
      queryClient.refetchQueries(["activity", activityId]);
    },
    onError: () => {
      throw Error("Something went wrong")
    },
    mutationFn: completeActivity,
  });
};

