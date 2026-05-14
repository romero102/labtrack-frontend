import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, getLabsRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used whitin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [labs, setLabs] = useState([])

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      console.log(res.data);
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.message,
        ];
      setErrors(newErrors);

    }
  };

  const navigate = useNavigate()

  const logout = async () => {
    try {
      await logoutRequest(); // llama al backend
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login"); // redirige
    } catch (error) {
      const newErrors =
        error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.message,
        ];
      setErrors(newErrors);
    }
  };

  const getlabs = async() => {
    try {
    const res = await getLabsRequest()
    setLabs(res.data)
    console.log(res.data)    
    } catch (error) {
      const newErrors = error.response?.data?.errors || (error.response?.data?.message && [error.response.message]) || [error.message]
      setErrors(newErrors)
    }
  }

  useEffect(() => {
    if(errors.length > 0){
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  },[errors])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        errors,
        getlabs,
        labs

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
