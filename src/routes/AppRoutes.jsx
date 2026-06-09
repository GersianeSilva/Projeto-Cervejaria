import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";

import CrudCervejas from "../crud/CrudCervejas";
import CrudClientes from "../crud/CrudClientes";
import CrudPedidos from "../crud/CrudPedidos";
import Relatorio from "../crud/Relatorio";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/cervejas"
          element={
            <ProtectedRoute>
              <CrudCervejas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <CrudClientes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <CrudPedidos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorio"
          element={
            <ProtectedRoute>
              <Relatorio />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;