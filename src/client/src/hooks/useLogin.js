import { loginWithUsernameAndPassword } from "@/features/auth/api/login";
import storage from "@/utils/storage";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await loginWithUsernameAndPassword({username, password})
    .then(res => res)
    .catch(error => error)

    if (response.statusText !== 'OK') {
      setIsLoading(false)
      setError(response.response.data)
    }

    if (response.statusText === 'OK') {
      storage.setToken(response.data)
      dispatch({type: "LOGIN", payload: response.data})
      setIsLoading(false)
    }
  }
  return {login, error, isLoading}
}