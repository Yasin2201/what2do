import { axios } from "@/lib/axios";

export const loginWithUsernameAndPassword = (data) => {
  return axios.post('/auth/login', data)
};