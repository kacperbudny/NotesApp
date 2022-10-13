import { createContext, useEffect, useState } from "react";
import authProvider from "@services/authProvider";
import tokenProvider from "@services/tokenProvider";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(tokenProvider.getToken());

  useEffect(() => {
    if (token && !user) {
      try {
        const decodedToken = JSON.parse(window.atob(token.split(".")[1]));
        setUser({ email: decodedToken.email, userId: decodedToken.userId });
      } catch (error) {
        console.error(error);
      }
    }
  }, [token, user]);

  const signUp = async (newUser) => {
    try {
      const { user, token } = await authProvider.signUp(newUser);
      setUser(user);
      setToken(token);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (credentials) => {
    try {
      const { user, token } = await authProvider.signIn(credentials);
      setUser(user);
      setToken(token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setToken(null);
      await authProvider.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
