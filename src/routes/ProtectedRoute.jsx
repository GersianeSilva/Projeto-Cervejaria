import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const logado = localStorage.getItem("logado");

  return logado ? children : <Navigate to="/" />;
}

export default ProtectedRoute;