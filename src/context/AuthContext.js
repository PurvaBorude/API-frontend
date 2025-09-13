import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const res = await API.get("/users/profile"); 
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    localStorage.removeItem("token");
    const res = await API.post("/users/login", { email, password }); 
    localStorage.setItem("token", res.data.token);

    const profile = await API.get("/users/profile"); 
    setUser(profile.data);
  };

  const register = async (name, email, password) => {
    localStorage.removeItem("token");
    await API.post("/users/register", { name, email, password }); 
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const forgotPassword = async (email) => {
    return await API.post("/users/forgot-password", { email }); 
  };

  const resetPassword = async (token, newPassword) => {
    return await API.post(`/users/reset-password/${token}`, { newPassword }); 
  };

  const changePassword = async (currentPassword, newPassword) => {
    return await API.put("/users/change-password", { currentPassword, newPassword }); 
  };

  const changeUsername = async (newUsername) => {
  const res = await API.put("/users/change-username", { newUsername });
  setUser((prev) => ({ ...prev, username: res.data.user?.username || newUsername }));
};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        forgotPassword,
        resetPassword,
        changePassword,
        changeUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
