import { createContext, useState, useContext, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
  getLabsRequest,
  getLabRequest,
  createLabRequest,
  updateLabRequest,
  deleteLabRequest,
  getComputersRequest,
  getComputerRequest,
  createComputerRequest,
  updateComputerRequest,
  deleteComputerRequest,
  getMaintenancesRequest,
  getMaintenanceRequest,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  getUsersRequest,
  getUserRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest
} from "../api/auth";
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
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true)

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.message,
        ];
      setErrors(newErrors);
    }
  };

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutRequest(); // llama al backend
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login"); // redirige
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.message,
        ];
      setErrors(newErrors);
    }
  };

  const getLabs = async () => {
    try {
      const res = await getLabsRequest();
      setLabs(res.data.data);
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.message]) || [
          error.message,
        ];
      setErrors(newErrors);
    }
  };

  const getLab = async (id) => {
    try {
      await getLabRequest(id)
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.message]) || [
          error.message,
        ];
      setErrors(newErrors);
    }
  }

  const createLab = async (lab) => {
    try {
      await createLabRequest(lab)
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.data.message,
        ];
      setErrors(newErrors);
    }
  }

  const deleteLab = async (id) => {
    try {
      const res = await deleteLabRequest(id)
      if(res.status === 200) setLabs(labs.filter(lab => lab._id != id))
        console.log(res.data)
    } catch (error) {
      const newErrors = error.response?.data?.errors ||
        (error.response?.data?.message && [error.response.data.message]) || [
          error.data.message,
        ];
      setErrors(newErrors);
    }
    
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await verifyTokenRequest();

      if (!res.data) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      setIsAuthenticated(true);
      setUser(res.data);

    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  checkLogin();
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        errors,
        getLabs,
        getLab,
        labs,
        createLab,
        deleteLab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
