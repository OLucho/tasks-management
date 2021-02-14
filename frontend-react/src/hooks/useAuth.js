import { createContext, useContext, useCallback, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@taskManagment:token");
    const user = localStorage.getItem("@taskManagment:user");
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return { token: null, user: null };
  });

  const signUp = useCallback(async (username, password) => {
    try {
      console.log(username, password);
      await api.post("/auth/signup", { username, password });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signIn = useCallback(async (username, password) => {
    try {
      const auth = await api.post("/auth/signin", { username, password });
      if (auth.status === 201) {
        const token = auth.data.accessToken;
        api.defaults.headers.authorization = `Bearer ${token}`;
        const user = await api.get("/auth/user");
        localStorage.setItem("@taskManagment:token", token);
        localStorage.setItem("@taskManagment:user", JSON.stringify(user.data));

        setData({
          user: user.data,
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  function signOut() {
    localStorage.removeItem("@Innstagram:token");
    localStorage.removeItem("@Innstagram:token");
    setData({ token: null, user: null });
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be used within a AuthProvider  ");
  }
  return context;
}
