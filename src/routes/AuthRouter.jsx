import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login"
import SetupAdmin from "../pages/SetupAdmin";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Setup-admin" element={<SetupAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;