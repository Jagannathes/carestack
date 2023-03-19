import React, { createContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../utils/firebase";
import axios from 'axios'
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [user, loading, error] = useAuthState(auth);
  const [authToken, setAuthToken] = useState(null);
  useEffect(() => {
    if (user) {
      getAuthToken();
    }
    if(!user && currentUser){
      setCurrentUser(null)
    }
  }, [user]);

  const getAuthToken = async () => {
    setUserLoading(true);
    const token = await auth.currentUser?.getIdToken(true);
    console.log(token)
    setAuthToken(token);
    const res = await axios.get(`/api/user/login`, {
      headers: {
        "x-auth-token":token,
      }
    });
    setCurrentUser(res.data.user);
    setUserLoading(false);
    console.log(res.data);
  };

  return (
    <AuthContext.Provider value={{ user:currentUser, loading: loading || userLoading || (user && !currentUser), error, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;