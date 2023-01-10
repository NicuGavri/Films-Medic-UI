import { createContext, useContext, FC, useState, useEffect } from "react";
import { AuthProps } from "./types";
import { AuthContextt } from "./types";
import { getIsAuth, signInUser } from "../../api/auth";

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: "",
  };
  

const authContext = createContext<AuthContextt>({
    authInfo: {},
    handleLogin: () => null,
    isAuth: () => null,
    handleLogout: () => null,
});


const AuthProvider: FC<AuthProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const handleLogin = async (email: string, password: string) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

    localStorage.setItem('auth-token', user.token)
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setAuthInfo({...defaultAuthInfo})
  }


  const isAuth = async () => {
    const token = localStorage.getItem('auth-token')
    if(!token) return;
    
    setAuthInfo({...authInfo, isPending: true})
    const {error, user} = await getIsAuth(token)

    if(error){
      return setAuthInfo({...authInfo, isPending: false, error})
    } 

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

  }

  useEffect(() => {
    isAuth()
  },[])

  return (
    <authContext.Provider
      value={{ authInfo, handleLogin, isAuth, handleLogout }}
    >
      {children}
    </authContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(authContext);
};

export default AuthProvider;
