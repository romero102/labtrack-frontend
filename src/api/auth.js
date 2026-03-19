import API from "./axios";

//  Setup Admin
export const setupAdmin = (data) => {
  return API.post("/auth/setup-admin", data, {
    headers: {
      "x-install-token": import.meta.env.VITE_INSTALL_TOKEN,
    },
  });
};

//  Login
export const login = (data) => {
  return API.post("/auth/login", data);
};

//  Setup Status
export const getSetupStatus = () => {
  return API.get("/auth/setup-status");
};