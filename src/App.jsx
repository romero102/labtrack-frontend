import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import Computers from "./pages/Computers";
import ComputerForm from "./pages/ComputerForm";
import Laboratories from "./pages/Laboratories";
import LaboratoryForm from "./pages/LaboratoryForm";
import Maintenance from "./pages/Maintenance";
import MaintenanceForm from "./pages/MaintenanceForm";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{duration: 3000, }} />
        <Routes>
          <Route path="/" element={<h1>Home page</h1>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Layout />}>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/userform" element={<UserForm />}></Route>
              <Route path="/userform/:id" element={<UserForm />}></Route>
              <Route path="/laboratories" element={<Laboratories />}></Route>
              <Route
                path="/laboratoryform"
                element={<LaboratoryForm />}
              ></Route>
              <Route
                path="/laboratoryform/:id"
                element={<LaboratoryForm />}
              ></Route>
              <Route path="/computers" element={<Computers />}></Route>
              <Route path="/computerform" element={<ComputerForm />}></Route>
              <Route path="/computerform/:id" element={<ComputerForm />}></Route>
              <Route path="/maintenance" element={<Maintenance />}></Route>
              <Route
                path="/maintenanceform"
                element={<MaintenanceForm />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
