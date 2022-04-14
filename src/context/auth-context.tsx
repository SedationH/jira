import React, { useState, useContext, createContext, ReactNode } from "react";
import { useAsyncFn } from "react-use";

import * as auth from "src/auth-provider";
import { AuthForm } from "src/auth-provider";
import { FullPageLoading } from "src/components/lib";
import { User } from "src/screens/project-list/search-panel";
import { useMount } from "src/utils";
import { request } from "src/utils/request";

const bootstarpUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = createContext<{
  user: User | null;
  login: (form: AuthForm) => Promise<void>;
  register: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  const [{ loading }, doBootstrarpUser] = useAsyncFn(bootstarpUser);

  useMount(async () => {
    const user = await doBootstrarpUser();
    setUser(user);
  });

  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }
  return context;
};
