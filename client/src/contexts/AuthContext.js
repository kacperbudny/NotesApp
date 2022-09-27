import { createContext, useState } from "react";
import authProvider from "@services/authProvider";
import tokenProvider from "@services/tokenProvider";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(tokenProvider.getToken());

  const signUp = async (newUser) => {
    try {
      const { user, token } = await authProvider.signUp(newUser);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (credentials) => {
    try {
      const { user, token } = await authProvider.signIn(credentials);
      setUser(user);
      setToken(token);
    } catch (error) {
      console.error(error);
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

  const getUserData = async () => {
    try {
      const user = await authProvider.me();
      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, getUserData, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
