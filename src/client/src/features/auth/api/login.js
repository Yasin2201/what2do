import axios from "@/lib/axios";

const loginWithEmailAndPassword = (data) => {
  return axios.post('/auth/login', data);
};