import { createContext, useEffect, useState } from "react";
import authProvider from "@services/authProvider";
import getToken from "@utils/getToken";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    //if (token) navigate("/");
    if (token) {
      //get my data
    }
  }, []);

  const signUp = async (newUser) => {
    try {
      const user = await authProvider.signUp(newUser);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (credentials) => {
    try {
      const user = await authProvider.signIn(credentials);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    authProvider.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
