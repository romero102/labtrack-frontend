import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  console.log(user);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="bg-gray-800 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3">
        {/* Contenedor principal */}
        <div className="flex justify-between items-center">
          {/* Logo / título */}
          <h1 className="text-white font-bold text-lg">University</h1>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-300 md:hidden"
          >
            ☰
          </button>

          {/* Links desktop */}
          <div className="hidden md:flex gap-6">
            <Link to="/computers" className={linkClass("/computers")}>
              Computers
            </Link>
            <Link to="/laboratories" className={linkClass("/laboratories")}>
              Laboratories
            </Link>
            <Link to="/maintenance" className={linkClass("/maintenance")}>
              Maintenance
            </Link>
            <Link to="/users" className={linkClass("/users")}>
              Users
            </Link>
            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
                >
                  {user.name}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full w-40 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Links mobile */}
        {open && (
          <div className="mt-4 flex flex-col gap-2 md:hidden">
            <Link to="/computers" className={linkClass("/computers")}>
              Computers
            </Link>
            <Link to="/laboratories" className={linkClass("/laboratories")}>
              Laboratories
            </Link>
            <Link to="/maintenance" className={linkClass("/maintenance")}>
              Maintenance
            </Link>
            <Link to="/users" className={linkClass("/users")}>
              Users
            </Link>

            {/* Menú usuario solo si hay sesión */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {user.name}
                </button>

                {userMenuOpen && (
                  <div className="ml-4 mt-1 flex flex-col">
                    <button
                      onClick={logout}
                      className="text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
