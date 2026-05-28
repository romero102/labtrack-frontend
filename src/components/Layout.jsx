import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import TechnicianNavbar from "./TechnicianNavbar";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const { user } = useAuth();
  return (
    <>
      {user?.role === "admin" ? <Navbar /> : <TechnicianNavbar />}
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
