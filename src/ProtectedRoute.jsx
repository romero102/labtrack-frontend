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
    return (
      <Navigate
        to="/"
        replace
        state={
          // Solo guarda el from si NO viene de un logout (state null = logout)
          location.state !== null
            ? { from: location, requiresAuth: true }
            : null
        }
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
