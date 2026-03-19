import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSetupStatus } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await getSetupStatus();

        if (!res.data.initialized) {
          navigate("/setup-admin");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkSetup();
  }, []);

  return <h1 class="bg-amber-500">Login Page</h1>;
};

export default Login;