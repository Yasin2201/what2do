import { createContext, useCallback, useContext, useEffect, useState } from "react";
import storage from "@/utils/storage";
import { getUser, loginWithEmailAndPassword } from "@/features/auth";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [{ user, isLoggedIn, error }, setState] = useState({
    user: null,
    isLoggedIn: false,
    error: null,
  });

  async function handleUserResponse(resData) {
    const { data } = resData;
    storage.setToken(data.token);
    const user = data.user
    return user;
  }

  const loadUser = useCallback(async () => {
    if (storage.getToken()) {
      const data = await getUser();
      setState({
        user: data.data.user,
        isLoggedIn: true,
        error: false
      })
      return data;
    }
    return null;
  }, [])

  useEffect(() => {
      setLoading(true);
      loadUser()
      setLoading(false);
  }, [loadUser]);


  //User Auth Functionalities
  
  const loginFn = useCallback(async (data) => {
    setLoading(true)
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    loadUser()
    setLoading(false)
    return user;
  }, [loadUser])

  // const registerFn = () => {}
  // const logoutFn = () => {}

  return (
    <AuthContext.Provider
      value={{
        user, 
        isLoggedIn, 
        error,
        isLoading,
        loginFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}