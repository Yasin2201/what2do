import storage from "@/utils/storage"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    storage.clearToken()
    dispatch({type: "LOGOUT"})
  }

  return { logout }
} 