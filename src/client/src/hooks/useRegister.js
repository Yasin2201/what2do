import { registerWithUsernameAndPassword } from "@/features/auth/api/register";
import storage from "@/utils/storage";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const register = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await registerWithUsernameAndPassword({username, password})
    .then(res => res)
    .catch(error => error)

    if (!response.statusText) {
      setIsLoading(false)
      setError(response.response.data.error)
    }

    if (response.statusText === 'OK') {
      const storageData = {
        token: response.data.token,
        user: {
          id: response.data.user.id,
          username: response.data.user.username,
        }
      }
      storage.setToken(storageData)
      dispatch({type: "LOGIN", payload: storageData})
      setIsLoading(false)
    }
  }
  return {register, error, isLoading}
}