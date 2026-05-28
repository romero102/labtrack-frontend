import { createContext, useState, useContext, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
  getLabsRequest,
  getLabRequest,
  getMyLabsRequest,
  createLabRequest,
  updateLabRequest,
  deleteLabRequest,
  getComputersRequest,
  getComputerRequest,
  getComputerByLabRequest,
  createComputerRequest,
  updateComputerRequest,
  deleteComputerRequest,
  getAllMaintenanceRequest,
  getMyMaintenanceRequest,
  getMaintenanceRequest,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  getUsersRequest,
  getUserRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  restoreUserRequest,
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
  const [computers, setComputers] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComputers, setLoadingComputers] = useState(false);
  const [loadingLabs, setLoadingLabs] = useState(false);
  const [loadingMaintenance, setLoadingMaintenance] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)

  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
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
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  //----------------laboratories

  const getLabs = async () => {
    try {
      setLoadingLabs(true)
      const res = await getLabsRequest();
      setLabs(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }finally {
    setLoadingLabs(false);
  }
  };

  const getLab = async (id) => {
    try {
      const res = await getLabRequest(id);
      return res.data.data;
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const getMyLabs = async () => {
    try {
      setLoadingLabs(true);
      const res = await getMyLabsRequest();
      setLabs(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }finally {
    setLoadingLabs(false);
  }
  };

  const createLab = async (lab) => {
    try {
      await createLabRequest(lab);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const deleteLab = async (id) => {
    try {
      const res = await deleteLabRequest(id);
      if (res.status === 200) setLabs(labs.filter((lab) => lab._id != id));
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const updateLab = async (id, lab) => {
    try {
      await updateLabRequest(id, lab);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };
  //--------------users
  const getUsers = async () => {
    try {
      setLoadingUsers(true)
      const res = await getUsersRequest();
      setUsers(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }finally {
    setLoadingUsers(false);
  }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data.data;
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const createUser = async (user) => {
    try {
      await createUserRequest(user);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );
      console.log(error.response.data);
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 200) {
        setUsers(users.map((user) => (user._id === id ? res.data.data : user)));
      }
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const restoreUser = async (id) => {
    try {
      const res = await restoreUserRequest(id);
      if (res.status === 200) {
        setUsers(users.map((user) => (user._id === id ? res.data.data : user)));
      }
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  //-----------computers

  const getComputers = async () => {
    try {
      setLoadingComputers(true)
      const res = await getComputersRequest();
      setComputers(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }finally {
    setLoadingComputers(false);
  }
  };

  const getComputer = async (id) => {
    try {
      const res = await getComputerRequest(id);
      return res.data.data;
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const getComputerByLab = async (id) => {
    try {
      setComputers([]);
      setLoadingComputers(true);
      const res = await getComputerByLabRequest(id);
      setComputers(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    } finally {
      setLoadingComputers(false);
    }
  };

  const createComputer = async (computer) => {
    try {
      await createComputerRequest(computer);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const deleteComputer = async (id) => {
    try {
      const res = await deleteComputerRequest(id);
      if (res.status === 200)
        setComputers(computers.filter((computer) => computer._id != id));
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const updateComputer = async (id, computer) => {
    try {
      await updateComputerRequest(id, computer);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  //----------------maintenance

  const getAllMaintenance = async () => {
    try {
      setLoadingMaintenance(true)
      const res = await getAllMaintenanceRequest();
      setMaintenance(res.data.data);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }finally {
    setLoadingMaintenance(false);
  }
  };

  const getMyMaintenance = async () => {
    try {
      setLoadingMaintenance(true)
      const res = await getMyMaintenanceRequest();
      setMaintenance(res.data.data);
    } catch (error) {
      console.log(error);
    }finally {
    setLoadingMaintenance(false);
  }
  };

  const getMaintenance = async (id) => {
    try {
      const res = await getMaintenanceRequest(id);
      return res.data.data;
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const createMaintenance = async (maintenance) => {
    try {
      await createMaintenanceRequest(maintenance);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const deleteMaintenance = async (id) => {
    try {
      const res = await deleteMaintenanceRequest(id);
      if (res.status === 200)
        setMaintenance(
          maintenance.filter((maintenanc) => maintenanc._id != id),
        );
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

  const updateMaintenance = async (id, maintenance) => {
    try {
      await updateMaintenanceRequest(id, maintenance);
    } catch (error) {
      setErrors(
        error.response?.data?.errors?.map((err) => err.msg) || [
          error.response?.data?.message || "unknown error",
        ],
      );

      throw error;
    }
  };

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
        labs,
        loadingLabs,
        getLabs,
        getLab,
        getMyLabs,
        createLab,
        deleteLab,
        updateLab,
        users,
        loadingUsers,
        getUsers,
        getUser,
        createUser,
        deleteUser,
        restoreUser,
        updateUser,
        computers,
        loadingComputers,
        getComputers,
        getComputer,
        getComputerByLab,
        createComputer,
        deleteComputer,
        updateComputer,
        maintenance,
        loadingMaintenance,
        getAllMaintenance,
        getMyMaintenance,
        getMaintenance,
        createMaintenance,
        updateMaintenance,
        deleteMaintenance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
