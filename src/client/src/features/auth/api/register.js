import { axios } from "@/lib/axios";

export const registerWithUsernameAndPassword = (data) => {
  return axios.post('/auth/signup', data)
};