import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const { loading, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!isAuthenticated) {
    if (location.pathname.startsWith("/maintenance/")) {
      if (!sessionStorage.getItem("redirectAfterLogin")) {
        sessionStorage.setItem("redirectAfterLogin", location.pathname);
      }
      return <Navigate to="/" replace state={{ fromQR: true }} />;
      //     ↑ solo cuando ES maintenance
    }

    return <Navigate to="/" replace />;
    // ↑ cualquier otra ruta protegida, sin state
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
