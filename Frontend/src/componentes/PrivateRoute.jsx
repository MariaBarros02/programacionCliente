import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const [showingAlert, setShowingAlert] = useState(false);

  useEffect(() => {
   
   
    if (!loading && !isAuthenticated && !showingAlert) {
      setShowingAlert(true);
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    if (
      !loading &&
      isAuthenticated &&
      requiredRole &&
      user?.rol !== requiredRole &&
      !showingAlert
    ) {
      setShowingAlert(true);
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para acceder a esta sección.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }, [loading, isAuthenticated, user, requiredRole, showingAlert]);

  if (loading) return null; // spinner opcional aquí

  if (!isAuthenticated) return <Navigate to="/iniciarSesion" replace />;

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
