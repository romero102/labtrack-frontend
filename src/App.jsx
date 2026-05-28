import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import Computers from "./pages/Computers";
import ComputerForm from "./pages/ComputerForm";
import Laboratories from "./pages/Laboratories";
import MyLaboratories from "./pages/MyLaboratories";
import LaboratoryForm from "./pages/LaboratoryForm";
import Maintenance from "./pages/Maintenance";
import MaintenanceForm from "./pages/MaintenanceForm";
import MaintenanceByComputer from "./pages/MaintenanceByComputer";
import MyMaintenance from "./pages/MyMaintenance";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 3000 }}
        />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Rutas protegidas con Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              {/* Solo admin */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/users" element={<Users />} />
                <Route path="/userform" element={<UserForm />} />
                <Route path="/userform/:id" element={<UserForm />} />
                <Route path="/laboratories" element={<Laboratories />} />
                <Route path="/laboratoryform" element={<LaboratoryForm />} />
                <Route
                  path="/laboratoryform/:id"
                  element={<LaboratoryForm />}
                />
                <Route path="/computers" element={<Computers />} />
                <Route path="/computerform" element={<ComputerForm />} />
                <Route path="/computerform/:id" element={<ComputerForm />} />
              </Route>

              {/* Admin + technician */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={["admin", "technician"]} />
                }
              >
                <Route path="/mylaboratories" element={<MyLaboratories />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/mymaintenance" element={<MyMaintenance />} />
                <Route path="/maintenanceform" element={<MaintenanceForm />} />
                <Route
                  path="/maintenanceform/:id"
                  element={<MaintenanceForm />}
                />
                <Route
                  path="/maintenance/:id"
                  element={<MaintenanceByComputer />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
