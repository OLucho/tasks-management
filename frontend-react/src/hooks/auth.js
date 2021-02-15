import { createContext, useContext, useCallback, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [error, setError] = useState("");

  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@taskManagement:token");
    const user = localStorage.getItem("@taskManagement:user");
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return { token: null, user: null };
  });

  const signUp = useCallback(async (username, password) => {
    try {
      await api.post("/auth/signup", { username, password });
    } catch (error) {
      setError(error.response.data.message);
    }
  }, []);

  const signIn = useCallback(async (username, password) => {
    try {
      const auth = await api.post("/auth/signin", { username, password });
      if (auth.status === 201) {
        const token = auth.data.accessToken;
        api.defaults.headers.authorization = `Bearer ${token}`;
        const user = await api.get("/auth/user");
        localStorage.setItem("@taskManagement:token", token);
        localStorage.setItem("@taskManagement:user", JSON.stringify(user.data));

        setData({
          user: user.data,
          token,
        });
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }, []);

  function signOut() {
    localStorage.removeItem("@taskManagement:token");
    localStorage.removeItem("@taskManagement:user");
    setData({ token: null, user: null });
  }

  return (
    <AuthContext.Provider
      value={{ user: data.user, error, signUp, signIn, signOut }}
    >
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
