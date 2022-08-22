import { createContext, useState } from "react";
import authProvider from "@services/authProvider";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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
