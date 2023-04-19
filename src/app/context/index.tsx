"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../../../supabase";
import Landing from "@/components/Landing";
import Header from "@/components/Header";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children, switchTheme }) => {
  const [user, setUser] = useState(false);

  const onAuthStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      signOut: () => supabase.auth.signOut(),
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      <Header switchTheme={switchTheme} />
      {user ? children : <Landing />}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, signOut } = useContext(AuthContext);
  return { user, signOut };
};
