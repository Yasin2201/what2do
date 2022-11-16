import storage from "@/utils/storage";
import {createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext()

const authReducer = (state, action) => {
 switch (action.type) {
  case "LOGIN":
    return { user: action.payload }
  case "LOGOUT":
    return { user: null }
  default:
    return state;
 }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = storage.getToken()
    if (user) {
      dispatch({ type: "LOGIN", payload: user.user })
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{...state, dispatch, isLoading}}>
      { children }
    </AuthContext.Provider>
  )
}